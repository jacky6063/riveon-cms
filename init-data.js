import { supabase } from './src/lib/supabase.js'

async function initializeData() {
  try {
    console.log('檢查car_content資料表...')
    
    // 先檢查是否有資料
    const { data: existingData, error: checkError } = await supabase
      .from('car_content')
      .select('*')
      .eq('id', 1)
    
    if (checkError) {
      console.error('檢查資料錯誤:', checkError)
      return
    }
    
    if (existingData && existingData.length > 0) {
      console.log('資料已存在，欄位:', Object.keys(existingData[0]))
      return
    }
    
    console.log('插入初始資料...')
    
    // 插入初始資料
    const initialData = {
      id: 1,
      car1_name: '豪華轎車 - BMW 3系列',
      car1_image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      car1_link: 'https://www.bmw.com.tw/zh/all-models/3-series/sedan/2019/bmw-3-series-sedan-overview.html',
      
      car2_name: '休旅車 - BMW X3',
      car2_image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      car2_link: 'https://www.bmw.com.tw/zh/all-models/x-series/X3/2017/bmw-x3-overview.html',
      
      car3_name: '電動車 - Tesla Model 3',
      car3_image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      car3_link: 'https://www.tesla.com/zh_tw/model3',
      
      car4_name: '跑車 - Porsche 911',
      car4_image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      car4_link: 'https://www.porsche.com/taiwan/zh/models/911/',
      
      offer1_title: '週末特惠',
      offer1_discount: '20% 折扣',
      
      offer2_title: '長期租賃',
      offer2_discount: '15% 折扣',
      
      offer3_title: '新客戶優惠',
      offer3_discount: '25% 折扣',
      
      video1: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      video2: 'https://www.youtube.com/embed/jNQXAC9IVRw',
      
      hero_background_image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      hero_background_link: 'https://www.example.com'
    }
    
    const { data, error } = await supabase
      .from('car_content')
      .insert([initialData])
      .select()
    
    if (error) {
      console.error('插入資料錯誤:', error)
    } else {
      console.log('初始資料插入成功:', data)
    }
    
  } catch (err) {
    console.error('初始化錯誤:', err)
  }
}

initializeData()
