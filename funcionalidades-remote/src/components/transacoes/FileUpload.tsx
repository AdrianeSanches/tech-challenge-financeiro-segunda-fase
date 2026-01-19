'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Upload, X, FileText, Image as ImageIcon, File } from 'lucide-react'
import type { TransactionAttachment } from '@/lib/types'
import { toast } from 'sonner'

interface FileUploadProps {
  attachments: TransactionAttachment[]
  onChange: (attachments: TransactionAttachment[]) => void
  maxFiles?: number
  maxSizeMB?: number
}

export function FileUpload({
  attachments,
  onChange,
  maxFiles = 5,
  maxSizeMB = 50,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return

    const newFiles = Array.from(files)

    if (attachments.length + newFiles.length > maxFiles) {
      toast.error(`Você pode adicionar no máximo ${maxFiles} arquivos`)
      return
    }

    const maxSizeBytes = maxSizeMB * 1024 * 1024
    const invalidFiles = newFiles.filter((file) => file.size > maxSizeBytes)

    if (invalidFiles.length > 0) {
      toast.error(`Arquivo(s) muito grande(s). Tamanho máximo: ${maxSizeMB}MB`)
      return
    }

    const allowedTypes = ['image/', 'application/pdf']
    const invalidTypes = newFiles.filter(
      (file) => !allowedTypes.some((type) => file.type.startsWith(type))
    )

    if (invalidTypes.length > 0) {
      toast.error('Apenas imagens e arquivos PDF são permitidos')
      return
    }

    const newAttachments: TransactionAttachment[] = newFiles.map((file) => {
      const url = URL.createObjectURL(file)

      return {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        size: file.size,
        type: file.type,
        url,
        uploadedAt: new Date().toISOString(),
      }
    })

    const updatedAttachments = [...attachments, ...newAttachments]
    onChange(updatedAttachments)
    toast.success(`${newFiles.length} arquivo(s) adicionado(s)`)
    
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleRemove = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    const updatedAttachments = attachments.filter((att) => att.id !== id)
    onChange(updatedAttachments)
    toast.success('Arquivo removido')
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="h-5 w-5" />
    if (type === 'application/pdf') return <FileText className="h-5 w-5" />
    return <File className="h-5 w-5" />
  }

  return (
    <div className="space-y-3">
      <Label>Anexos (opcional)</Label>

      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors cursor-pointer ${
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-primary/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
        <p className="text-sm font-medium mb-1">
          Arraste arquivos ou clique para selecionar
        </p>
        <p className="text-xs text-muted-foreground">
          Imagens e PDF • Máx. {maxSizeMB}MB • Até {maxFiles} arquivos
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,application/pdf,.pdf"
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files)}
        />
      </div>

      {attachments.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">
            Arquivos anexados ({attachments.length}/{maxFiles})
          </p>
          {attachments.map((attachment) => (
            <Card key={attachment.id}>
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 text-muted-foreground">
                    {getFileIcon(attachment.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {attachment.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(attachment.size)}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={(e) => handleRemove(e, attachment.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
