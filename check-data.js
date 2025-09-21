import { supabase } from './src/lib/supabase.js'

async function checkData() {
  try {
    console.log('檢查資料庫連接...')
    
    // 檢查所有資料
    const { data, error } = await supabase
      .from('car_content')
      .select('*')
    
    if (error) {
      console.error('查詢錯誤:', error)
      return
    }
    
    console.log('查詢結果:')
    console.log('資料筆數:', data ? data.length : 0)
    
    if (data && data.length > 0) {
      console.log('找到資料!')
      data.forEach((row, index) => {
        console.log(`\n資料 ${index + 1}:`)
        console.log('ID:', row.id)
        console.log('欄位:', Object.keys(row))
        if (row.car1_name) console.log('car1_name:', row.car1_name)
        if (row.offer1_title) console.log('offer1_title:', row.offer1_title)
      })
    } else {
      console.log('資料表是空的')
    }
    
  } catch (err) {
    console.error('檢查資料時發生錯誤:', err)
  }
}

checkData()
