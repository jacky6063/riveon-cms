import React, { useState, useEffect } from 'react'
// import { Button } from './components/ui/button.jsx'
import { Plus } from 'lucide-react'
import ContentCard from './components/ContentCard'
import StatsCard from './components/StatsCard'
import { carContentService } from './lib/carContentService'
import './App.css'

function App() {
  const [carContent, setCarContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState(null)

  // 載入車輛內容資料
  useEffect(() => {
    loadCarContent()
  }, [])

  const loadCarContent = async () => {
    try {
      setLoading(true)
      const data = await carContentService.getCarContent()
      
      if (!data) {
        // 如果沒有資料，創建一個預設的資料結構
        const defaultData = {
          id: 1,
          car1_name: '', car1_image: '', car1_link: '',
          car2_name: '', car2_image: '', car2_link: '',
          car3_name: '', car3_image: '', car3_link: '',
          car4_name: '', car4_image: '', car4_link: '',
          offer1_title: '', offer1_discount: '', offer1_image: '',
          offer2_title: '', offer2_discount: '', offer2_image: '',
          offer3_title: '', offer3_discount: '', offer3_image: '',
          video1: '', video2: '',
          video1_link: '', video1_discount: '',
          video2_link: '', video2_discount: '',
          hero_background_image: '', hero_background_link: ''
        }
        setCarContent(defaultData)
      } else {
        setCarContent(data)
      }
      
      setError(null)
    } catch (err) {
      setError('載入資料失敗: ' + err.message)
      console.error('載入失敗:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (fieldName, updates) => {
    try {
      setUpdating(true)
      const updateData = {
        [fieldName]: updates.value
      }
      
      const updatedData = await carContentService.updateCarContent(updateData)
      setCarContent(updatedData)
      setError(null)
      
      // 顯示成功訊息
      alert('更新成功！')
    } catch (err) {
      setError('更新失敗: ' + err.message)
      console.error('更新失敗:', err)
      alert('更新失敗: ' + err.message)
    } finally {
      setUpdating(false)
    }
  }

  const handleMultipleUpdates = async (updateData) => {
    try {
      setUpdating(true)
      
      // 過濾掉空值
      const filteredData = Object.fromEntries(
        Object.entries(updateData).filter(([key, value]) => value !== undefined && value !== '')
      )
      
      const updatedData = await carContentService.updateCarContent(filteredData)
      setCarContent(updatedData)
      setError(null)
      
      // 顯示成功訊息
      alert('更新成功！')
    } catch (err) {
      setError('更新失敗: ' + err.message)
      console.error('更新失敗:', err)
      alert('更新失敗: ' + err.message)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen driveon-gradient flex items-center justify-center">
        <div className="text-white text-xl">載入中...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen driveon-gradient flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 max-w-md">
          <div className="text-red-600 text-center">
            <h2 className="text-xl font-bold mb-4">發生錯誤</h2>
            <p className="mb-4">{error}</p>
            <button onClick={loadCarContent} className="driveon-button">
              重新載入
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen driveon-gradient">
      <div className="container mx-auto px-6 py-8">
        {/* 頂部標題 */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                🚗 DriveOn 內容管理系統
              </h1>
              <p className="text-gray-600 mt-1">車輛內容管理與更新系統</p>
            </div>
          </div>
        </div>



        {/* 控制面板 */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-lg driveon-clean">
          <button 
            className="driveon-button flex items-center"
            onClick={() => {
              setLoading(true)
              loadCarContent()
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            重新刷新頁
          </button>
        </div>

        {/* 內容管理卡片 */}
        {carContent && (
          <div className="driveon-grid">
            {/* 車款1 - 圖片 */}
            <ContentCard
              title="車款1 - 圖片"
              imageUrl={carContent.car1_image}
              description={carContent.car1_name}
              linkUrl={carContent.car1_link}
              onUpdate={(updates) => handleMultipleUpdates({
                car1_image: updates.imageUrl,
                car1_name: updates.description,
                car1_link: updates.linkUrl
              })}
              isLoading={updating}
            />

            {/* 車款2 - 圖片 */}
            <ContentCard
              title="車款2 - 圖片"
              imageUrl={carContent.car2_image}
              description={carContent.car2_name}
              linkUrl={carContent.car2_link}
              onUpdate={(updates) => handleMultipleUpdates({
                car2_image: updates.imageUrl,
                car2_name: updates.description,
                car2_link: updates.linkUrl
              })}
              isLoading={updating}
            />

            {/* 車款3 - 圖片 */}
            <ContentCard
              title="車款3 - 圖片"
              imageUrl={carContent.car3_image}
              description={carContent.car3_name}
              linkUrl={carContent.car3_link}
              onUpdate={(updates) => handleMultipleUpdates({
                car3_image: updates.imageUrl,
                car3_name: updates.description,
                car3_link: updates.linkUrl
              })}
              isLoading={updating}
            />

            {/* 車款4 - 圖片 */}
            <ContentCard
              title="車款4 - 圖片"
              imageUrl={carContent.car4_image}
              description={carContent.car4_name}
              linkUrl={carContent.car4_link}
              onUpdate={(updates) => handleMultipleUpdates({
                car4_image: updates.imageUrl,
                car4_name: updates.description,
                car4_link: updates.linkUrl
              })}
              isLoading={updating}
            />

            {/* 優惠方案1 */}
            <ContentCard
              title="優惠方案1"
              imageUrl={carContent.offer1_image || ''}
              description={`${carContent.offer1_title} - ${carContent.offer1_discount}`}
              linkUrl=""
              onUpdate={(updates) => handleMultipleUpdates({
                offer1_image: updates.imageUrl,
                offer1_title: updates.description.split(' - ')[0],
                offer1_discount: updates.description.split(' - ')[1] || ''
              })}
              isLoading={updating}
            />

            {/* 優惠方案2 */}
            <ContentCard
              title="優惠方案2"
              imageUrl={carContent.offer2_image || ''}
              description={`${carContent.offer2_title} - ${carContent.offer2_discount}`}
              linkUrl=""
              onUpdate={(updates) => handleMultipleUpdates({
                offer2_image: updates.imageUrl,
                offer2_title: updates.description.split(' - ')[0],
                offer2_discount: updates.description.split(' - ')[1] || ''
              })}
              isLoading={updating}
            />

            {/* 優惠方案3 */}
            <ContentCard
              title="優惠方案3"
              imageUrl={carContent.offer3_image || ''}
              description={`${carContent.offer3_title || '新優惠方案'} - ${carContent.offer3_discount || '待設定'}`}
              linkUrl=""
              onUpdate={(updates) => handleMultipleUpdates({
                offer3_image: updates.imageUrl,
                offer3_title: updates.description.split(' - ')[0],
                offer3_discount: updates.description.split(' - ')[1] || ''
              })}
              isLoading={updating}
            />

            {/* YouTube影片1 */}
            <ContentCard
              title="影片1"
              imageUrl={carContent.video1_link || ''}
              description={carContent.video1_discount || ''}
              linkUrl=""
              onUpdate={(updates) => handleMultipleUpdates({
                video1_link: updates.imageUrl,
                video1_discount: updates.description
              })}
              isLoading={updating}
            />

            {/* YouTube影片2 */}
            <ContentCard
              title="影片2"
              imageUrl={carContent.video2_link || ''}
              description={carContent.video2_discount || ''}
              linkUrl=""
              onUpdate={(updates) => handleMultipleUpdates({
                video2_link: updates.imageUrl,
                video2_discount: updates.description
              })}
              isLoading={updating}
            />

            {/* 背景圖片 */}
            <div className="driveon-card">
              <div className="flex items-center mb-4">
                <span className="driveon-status-indicator"></span>
                <h3 className="text-lg font-semibold text-gray-800">背景圖片</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    圖片 URL
                  </label>
                  <input
                    type="text"
                    value={carContent.hero_background_image || ''}
                    onChange={(e) => setCarContent(prev => ({
                      ...prev,
                      hero_background_image: e.target.value
                    }))}
                    placeholder="請輸入背景圖片網址"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {carContent.hero_background_image && (
                  <div className="mt-3">
                    <img 
                      src={carContent.hero_background_image} 
                      alt="背景圖片預覽"
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
                  <textarea
                    value={carContent.hero_background_discount || ''}
                    onChange={(e) => setCarContent(prev => ({
                      ...prev,
                      hero_background_discount: e.target.value
                    }))}
                    placeholder="請輸入背景圖片描述資訊"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    連結網址
                  </label>
                  <input
                    type="text"
                    value={carContent.hero_background_link || ''}
                    onChange={(e) => setCarContent(prev => ({
                      ...prev,
                      hero_background_link: e.target.value
                    }))}
                    placeholder="請輸入連結網址"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button 
                  onClick={() => handleMultipleUpdates({
                    hero_background_image: carContent.hero_background_image,
                    hero_background_discount: carContent.hero_background_discount,
                    hero_background_link: carContent.hero_background_link
                  })}
                  disabled={updating}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {updating ? '更新中...' : '更新內容'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
