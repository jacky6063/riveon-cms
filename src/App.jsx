import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
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
      setCarContent(data)
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
            <Button onClick={loadCarContent} className="driveon-button">
              重新載入
            </Button>
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

        {/* 統計資訊 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatsCard value="17" label="總項目" />
          <StatsCard value="1" label="已發布項目" />
          <StatsCard value="6%" label="成功率" />
        </div>

        {/* 控制面板 */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
          <Button className="driveon-button flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            新增項目
          </Button>
        </div>

        {/* 內容管理卡片 */}
        {carContent && (
          <div className="driveon-grid">
            {/* 車款1 - 圖片 */}
            <ContentCard
              title="車款1 - 圖片"
              imageUrl={carContent.car1_image}
              description={carContent.car1_name}
              onUpdate={(updates) => handleUpdate(updates.type === 'image' ? 'car1_image' : 'car1_name', updates)}
              isLoading={updating}
            />

            {/* 車款2 - 圖片 */}
            <ContentCard
              title="車款2 - 圖片"
              imageUrl={carContent.car2_image}
              description={carContent.car2_name}
              onUpdate={(updates) => handleUpdate(updates.type === 'image' ? 'car2_image' : 'car2_name', updates)}
              isLoading={updating}
            />

            {/* 車款3 - 圖片 */}
            <ContentCard
              title="車款3 - 圖片"
              imageUrl={carContent.car3_image}
              description={carContent.car3_name}
              onUpdate={(updates) => handleUpdate(updates.type === 'image' ? 'car3_image' : 'car3_name', updates)}
              isLoading={updating}
            />

            {/* 車款4 - 圖片 */}
            <ContentCard
              title="車款4 - 圖片"
              imageUrl={carContent.car4_image}
              description={carContent.car4_name}
              onUpdate={(updates) => handleUpdate(updates.type === 'image' ? 'car4_image' : 'car4_name', updates)}
              isLoading={updating}
            />

            {/* 優惠方案1 */}
            <ContentCard
              title="優惠方案1"
              imageUrl=""
              description={`${carContent.offer1_title} - ${carContent.offer1_discount}`}
              onUpdate={(updates) => {
                const [title, discount] = updates.value.split(' - ')
                handleUpdate('offer1_title', { value: title })
                if (discount) handleUpdate('offer1_discount', { value: discount })
              }}
              isLoading={updating}
            />

            {/* 優惠方案2 */}
            <ContentCard
              title="優惠方案2"
              imageUrl=""
              description={`${carContent.offer2_title} - ${carContent.offer2_discount}`}
              onUpdate={(updates) => {
                const [title, discount] = updates.value.split(' - ')
                handleUpdate('offer2_title', { value: title })
                if (discount) handleUpdate('offer2_discount', { value: discount })
              }}
              isLoading={updating}
            />

            {/* YouTube影片1 */}
            <ContentCard
              title="YouTube影片1"
              imageUrl=""
              description={carContent.video1}
              onUpdate={(updates) => handleUpdate('video1', updates)}
              isLoading={updating}
            />

            {/* YouTube影片2 */}
            <ContentCard
              title="YouTube影片2"
              imageUrl=""
              description={carContent.video2}
              onUpdate={(updates) => handleUpdate('video2', updates)}
              isLoading={updating}
            />

            {/* 背景圖片 */}
            <ContentCard
              title="背景圖片"
              imageUrl={carContent.hero_background_image}
              description={carContent.hero_background_link}
              onUpdate={(updates) => handleUpdate(updates.type === 'image' ? 'hero_background_image' : 'hero_background_link', updates)}
              isLoading={updating}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
