import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

const ContentCard = ({ 
  title, 
  imageUrl, 
  description, 
  onUpdate, 
  isLoading = false 
}) => {
  const [localImageUrl, setLocalImageUrl] = useState(imageUrl || '')
  const [localDescription, setLocalDescription] = useState(description || '')

  const handleUpdate = () => {
    // 根據卡片類型決定更新哪個欄位
    if (title.includes('描述') || title.includes('性能')) {
      onUpdate({ type: 'description', value: localDescription })
    } else {
      onUpdate({ type: 'image', value: localImageUrl })
    }
  }

  return (
    <div className="driveon-card">
      <div className="flex items-center mb-4">
        <span className="driveon-status-indicator"></span>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            圖片 URL
          </label>
          <Input
            value={localImageUrl}
            onChange={(e) => setLocalImageUrl(e.target.value)}
            placeholder="請輸入圖片網址"
            className="driveon-input"
          />
        </div>

        {localImageUrl && (
          <div className="mt-3">
            <img 
              src={localImageUrl} 
              alt={title}
              className="w-full h-32 object-cover rounded-lg border border-gray-200"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            描述資訊
          </label>
          <Textarea
            value={localDescription}
            onChange={(e) => setLocalDescription(e.target.value)}
            placeholder="請輸入描述內容"
            className="driveon-input min-h-[80px]"
            rows={3}
          />
        </div>

        <Button 
          onClick={handleUpdate}
          disabled={isLoading}
          className="driveon-button w-full"
        >
          {isLoading ? '更新中...' : '更新內容'}
        </Button>
      </div>
    </div>
  )
}

export default ContentCard
