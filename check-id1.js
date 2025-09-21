import { supabase } from './src/lib/supabase.js'

async function checkId1Data() {
  try {
    console.log('檢查 car_content 資料表中 ID=1 的資料...')
    console.log('使用的 Supabase URL:', process.env.VITE_SUPABASE_URL || 'https://byajesarlzmednorryoo.supabase.co')
    
    // 檢查ID=1的資料
    const { data, error } = await supabase
      .from('car_content')
      .select('*')
      .eq('id', 1)
    
    if (error) {
      console.error('查詢錯誤:', error)
      console.error('錯誤代碼:', error.code)
      console.error('錯誤訊息:', error.message)
      return
    }
    
    console.log('\n=== 查詢結果 ===')
    console.log('資料筆數:', data ? data.length : 0)
    
    if (data && data.length > 0) {
      console.log('\n✅ 找到 ID=1 的資料!')
      const record = data[0]
      console.log('完整記錄:', JSON.stringify(record, null, 2))
      
      console.log('\n=== 重要欄位檢查 ===')
      console.log('ID:', record.id)
      console.log('car1_name:', record.car1_name || '(空值)')
      console.log('car1_image:', record.car1_image || '(空值)')
      console.log('offer1_title:', record.offer1_title || '(空值)')
      console.log('offer1_image:', record.offer1_image || '(空值)')
      console.log('video1:', record.video1 || '(空值)')
      
    } else {
      console.log('\n❌ 沒有找到 ID=1 的資料')
      
      // 檢查是否有其他ID的資料
      console.log('\n檢查是否有其他資料...')
      const { data: allData, error: allError } = await supabase
        .from('car_content')
        .select('id')
      
      if (allError) {
        console.error('查詢所有資料錯誤:', allError)
      } else {
        console.log('資料表中的所有ID:', allData.map(row => row.id))
      }
    }
    
  } catch (err) {
    console.error('檢查資料時發生錯誤:', err)
  }
}

checkId1Data()
