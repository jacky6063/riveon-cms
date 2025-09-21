import { supabase } from './src/lib/supabase.js'

async function insertInitialData() {
  try {
    console.log('開始插入初始資料...')
    
    // 先刪除現有資料（如果有的話）
    const { error: deleteError } = await supabase
      .from('car_content')
      .delete()
      .eq('id', 1)
    
    if (deleteError && deleteError.code !== 'PGRST116') {
      console.log('刪除現有資料錯誤（可忽略）:', deleteError.message)
    }
    
    // 插入新的初始資料
    const initialData = {
      id: 1,
      car1_name: '豪華轎車 - BMW 3系列',
      car1_image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      car1_link: 'https://www.bmw.com.tw/zh/all-models/3-series/sedan/2019/bmw-3-series-sedan-overview.html',
      
      car2_name: '休旅車 - BMW X3',
      car2_image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      car2_link: 'https://www.bmw.com.tw/zh/all-models/x-series/X3/2017/bmw-x3-overview.html',
      
      car3_name: '電動車 - Tesla Model 3',
      car3_image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      car3_link: 'https://www.tesla.com/zh_tw/model3',
      
      car4_name: '跑車 - Porsche 911',
      car4_image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      car4_link: 'https://www.porsche.com/taiwan/zh/models/911/',
      
      offer1_title: '週末特惠',
      offer1_discount: '20% 折扣',
      offer1_image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      
      offer2_title: '長期租賃',
      offer2_discount: '15% 折扣',
      offer2_image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      
      offer3_title: '新客戶優惠',
      offer3_discount: '25% 折扣',
      offer3_image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      
      video1: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      video2: 'https://www.youtube.com/embed/jNQXAC9IVRw',
      
      hero_background_image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      hero_background_link: 'https://www.driveon.com'
    }
    
    // 使用 upsert 來插入或更新資料
    const { data, error } = await supabase
      .from('car_content')
      .upsert([initialData], { 
        onConflict: 'id',
        ignoreDuplicates: false 
      })
      .select()
    
    if (error) {
      console.error('插入資料錯誤:', error)
      
      // 如果 upsert 失敗，嘗試直接 insert
      console.log('嘗試直接插入...')
      const { data: insertData, error: insertError } = await supabase
        .from('car_content')
        .insert([initialData])
        .select()
      
      if (insertError) {
        console.error('直接插入也失敗:', insertError)
        return false
      } else {
        console.log('直接插入成功:', insertData)
        return true
      }
    } else {
      console.log('Upsert 成功:', data)
      return true
    }
    
  } catch (err) {
    console.error('插入初始資料時發生錯誤:', err)
    return false
  }
}

// 執行插入
insertInitialData().then(success => {
  if (success) {
    console.log('✅ 初始資料插入完成！')
  } else {
    console.log('❌ 初始資料插入失敗')
  }
  process.exit(success ? 0 : 1)
})
