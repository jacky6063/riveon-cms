import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

const ContentCard = ({ 
  title, 
  imageUrl, 
  description,
  linkUrl,
  onUpdate, 
  isLoading = false 
}) => {
  const [localImageUrl, setLocalImageUrl] = useState(imageUrl || '')
  const [localDescription, setLocalDescription] = useState(description || '')
  const [localLinkUrl, setLocalLinkUrl] = useState(linkUrl || '')

  const handleUpdate = () => {
    onUpdate({ 
      imageUrl: localImageUrl,
      description: localDescription,
      linkUrl: localLinkUrl
    })
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

        {/* 圖片預覽或影片預覽 */}
        {title.includes('影片') ? (
          // 影片預覽 - 總是顯示預覽區域
          <div className="mt-3">
            <div className="w-full h-48 border-2 border-red-300 rounded-lg bg-gray-50 flex items-center justify-center">
              {(() => {
                if (!localImageUrl) {
                  return (
                    <div className="text-center text-gray-500">
                      <div className="text-red-500 text-lg font-medium mb-2">預覽影片</div>
                      <div className="text-sm">請輸入YouTube網址以預覽影片</div>
                    </div>
                  )
                }
                
                // 提取YouTube影片ID
                const getYouTubeId = (url) => {
                  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
                  const match = url.match(regExp)
                  return (match && match[2].length === 11) ? match[2] : null
                }
                
                const videoId = getYouTubeId(localImageUrl)
                
                if (videoId) {
                  return (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    />
                  )
                } else {
                  return (
                    <div className="text-center text-gray-500">
                      <div className="text-red-500 text-lg font-medium mb-2">預覽影片</div>
                      <div className="text-sm">請輸入有效的YouTube網址</div>
                    </div>
                  )
                }
              })()}
            </div>
          </div>
        ) : (
          // 一般圖片預覽
          localImageUrl && (
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
          )
        )}

        {/* 根據卡片類型顯示不同的描述欄位 */}
        {title.includes('優惠方案') ? (
          // 優惠方案：分開顯示標題和折扣
          <>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                優惠標題
              </label>
              <Input
                value={localDescription.split(' - ')[0] || localDescription}
                onChange={(e) => {
                  const discount = localDescription.split(' - ')[1] || ''
                  setLocalDescription(discount ? `${e.target.value} - ${discount}` : e.target.value)
                }}
                placeholder="請輸入優惠標題"
                className="driveon-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                折扣資訊
              </label>
              <Input
                value={localDescription.split(' - ')[1] || ''}
                onChange={(e) => {
                  const title = localDescription.split(' - ')[0] || localDescription
                  setLocalDescription(`${title} - ${e.target.value}`)
                }}
                placeholder="請輸入折扣資訊"
                className="driveon-input"
              />
            </div>
          </>
        ) : (
          // 其他卡片：使用原來的textarea
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
        )}

        {/* 連結欄位 - 影片卡片不顯示 */}
        {!title.includes('影片') && (
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              連結網址
            </label>
            <Input
              value={localLinkUrl}
              onChange={(e) => setLocalLinkUrl(e.target.value)}
              placeholder="請輸入連結網址"
              className="driveon-input"
            />
          </div>
        )}

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
