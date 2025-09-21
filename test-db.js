import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://byajesarlzmednorryoo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5YWplc2FybHptZWRub3JyeW9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMDkwNjcsImV4cCI6MjA2OTc4NTA2N30.ilsdU8VnKz2FLG6-XV0cK31aOLnHIv1oexD_CgK4BE4'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testDatabase() {
  try {
    // 查詢car_content資料表的所有記錄
    console.log('查詢car_content資料表...')
    const { data, error } = await supabase
      .from('car_content')
      .select('*')
    
    if (error) {
      console.error('查詢錯誤:', error)
    } else {
      console.log('查詢成功，資料結構:')
      console.log('資料筆數:', data ? data.length : 0)
      if (data && data.length > 0) {
        console.log('欄位名稱:', Object.keys(data[0]))
        console.log('第一筆資料:', data[0])
      } else {
        console.log('沒有找到資料，可能需要先插入資料')
        // 嘗試查詢資料表結構
        console.log('嘗試查詢資料表是否存在...')
      }
    }
  } catch (err) {
    console.error('連接錯誤:', err)
  }
}

testDatabase()
