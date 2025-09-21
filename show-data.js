import { createClient } from '@supabase/supabase-js'

// 使用 service key 來繞過 RLS 政策
const supabaseUrl = 'https://byajesarlzmednorryoo.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5YWplc2FybHptZWRub3JyeW9vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDIwOTA2NywiZXhwIjoyMDY5Nzg1MDY3fQ.vI-9lZu6xvBt8NxOZuLWKQ_ABx7qPga'

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

async function showId1Data() {
  try {
    console.log('使用 Service Key 查詢 car_content 資料表...')
    console.log('Supabase URL:', supabaseUrl)
    
    // 使用 service key 查詢所有資料
    console.log('\n=== 查詢所有資料 ===')
    const { data: allData, error: allError } = await supabaseAdmin
      .from('car_content')
      .select('*')
    
    if (allError) {
      console.error('查詢所有資料錯誤:', allError)
    } else {
      console.log('總資料筆數:', allData.length)
      if (allData.length > 0) {
        allData.forEach((row, index) => {
          console.log(`\n--- 資料 ${index + 1} ---`)
          console.log('ID:', row.id)
          console.log('所有欄位:', Object.keys(row))
        })
      }
    }
    
    // 專門查詢 ID=1
    console.log('\n=== 查詢 ID=1 的資料 ===')
    const { data, error } = await supabaseAdmin
      .from('car_content')
      .select('*')
      .eq('id', 1)
    
    if (error) {
      console.error('查詢 ID=1 錯誤:', error)
      console.error('錯誤代碼:', error.code)
      console.error('錯誤訊息:', error.message)
      return
    }
    
    console.log('ID=1 資料筆數:', data ? data.length : 0)
    
    if (data && data.length > 0) {
      console.log('\n✅ 找到 ID=1 的資料!')
      const record = data[0]
      
      console.log('\n=== 完整資料內容 ===')
      console.log(JSON.stringify(record, null, 2))
      
      console.log('\n=== 車款資料 ===')
      for (let i = 1; i <= 4; i++) {
        console.log(`車款${i}:`)
        console.log(`  名稱: ${record[`car${i}_name`] || '(空值)'}`)
        console.log(`  圖片: ${record[`car${i}_image`] || '(空值)'}`)
        console.log(`  連結: ${record[`car${i}_link`] || '(空值)'}`)
      }
      
      console.log('\n=== 優惠方案資料 ===')
      for (let i = 1; i <= 3; i++) {
        console.log(`優惠方案${i}:`)
        console.log(`  標題: ${record[`offer${i}_title`] || '(空值)'}`)
        console.log(`  折扣: ${record[`offer${i}_discount`] || '(空值)'}`)
        console.log(`  圖片: ${record[`offer${i}_image`] || '(空值)'}`)
      }
      
      console.log('\n=== 影片資料 ===')
      console.log(`影片1: ${record.video1 || '(空值)'}`)
      console.log(`影片2: ${record.video2 || '(空值)'}`)
      
      console.log('\n=== 背景圖片資料 ===')
      console.log(`背景圖片: ${record.hero_background_image || '(空值)'}`)
      console.log(`背景連結: ${record.hero_background_link || '(空值)'}`)
      
    } else {
      console.log('\n❌ 確實沒有 ID=1 的資料')
      
      // 嘗試插入測試資料
      console.log('\n=== 嘗試插入測試資料 ===')
      const testData = {
        id: 1,
        car1_name: '測試車款1',
        car1_image: 'https://example.com/car1.jpg',
        car1_link: 'https://example.com/car1',
        offer1_title: '測試優惠1',
        offer1_discount: '10%',
        offer1_image: 'https://example.com/offer1.jpg'
      }
      
      const { data: insertData, error: insertError } = await supabaseAdmin
        .from('car_content')
        .insert([testData])
        .select()
      
      if (insertError) {
        console.error('插入測試資料失敗:', insertError)
      } else {
        console.log('✅ 成功插入測試資料:', insertData)
      }
    }
    
  } catch (err) {
    console.error('執行時發生錯誤:', err)
  }
}

showId1Data()
