import { createClient } from '@supabase/supabase-js'

// 使用 anon key
const supabaseUrl = 'https://byajesarlzmednorryoo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5YWplc2FybHptZWRub3JyeW9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMDkwNjcsImV4cCI6MjA2OTc4NTA2N30.ilsdU8VnKz2FLG6-XV0cK31aOLnHIv1oexD_CgK4BE4'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function debugData() {
  try {
    console.log('=== 偵錯資料庫連接 ===')
    console.log('Supabase URL:', supabaseUrl)
    console.log('使用 anon key 查詢...')
    
    // 1. 檢查資料表是否存在
    console.log('\n1. 檢查資料表結構...')
    try {
      const { data: tableData, error: tableError } = await supabase
        .from('car_content')
        .select('*')
        .limit(1)
      
      if (tableError) {
        console.error('資料表查詢錯誤:', tableError)
        if (tableError.code === '42P01') {
          console.log('❌ 資料表不存在')
          return
        }
      } else {
        console.log('✅ 資料表存在')
      }
    } catch (err) {
      console.error('資料表檢查失敗:', err)
      return
    }
    
    // 2. 檢查總資料筆數
    console.log('\n2. 檢查總資料筆數...')
    const { count, error: countError } = await supabase
      .from('car_content')
      .select('*', { count: 'exact', head: true })
    
    if (countError) {
      console.error('計數查詢錯誤:', countError)
    } else {
      console.log('總資料筆數:', count)
    }
    
    // 3. 查詢所有資料的ID
    console.log('\n3. 查詢所有資料的ID...')
    const { data: idData, error: idError } = await supabase
      .from('car_content')
      .select('id')
    
    if (idError) {
      console.error('ID查詢錯誤:', idError)
    } else {
      console.log('所有ID:', idData.map(row => row.id))
    }
    
    // 4. 嘗試不同的查詢方式查找ID=1
    console.log('\n4. 嘗試不同方式查詢ID=1...')
    
    // 方式1: 直接查詢
    const { data: data1, error: error1 } = await supabase
      .from('car_content')
      .select('*')
      .eq('id', 1)
    
    console.log('方式1 - 直接查詢結果:', data1?.length || 0, '筆')
    if (error1) console.log('方式1錯誤:', error1)
    
    // 方式2: 使用字串比較
    const { data: data2, error: error2 } = await supabase
      .from('car_content')
      .select('*')
      .eq('id', '1')
    
    console.log('方式2 - 字串查詢結果:', data2?.length || 0, '筆')
    if (error2) console.log('方式2錯誤:', error2)
    
    // 方式3: 使用範圍查詢
    const { data: data3, error: error3 } = await supabase
      .from('car_content')
      .select('*')
      .gte('id', 1)
      .lte('id', 1)
    
    console.log('方式3 - 範圍查詢結果:', data3?.length || 0, '筆')
    if (error3) console.log('方式3錯誤:', error3)
    
    // 5. 如果找到資料，顯示內容
    const foundData = data1 || data2 || data3
    if (foundData && foundData.length > 0) {
      console.log('\n✅ 找到ID=1的資料!')
      console.log('資料內容:')
      console.log(JSON.stringify(foundData[0], null, 2))
    } else {
      console.log('\n❌ 確實沒有找到ID=1的資料')
      
      // 6. 嘗試查詢所有資料
      console.log('\n6. 查詢前5筆資料...')
      const { data: allData, error: allError } = await supabase
        .from('car_content')
        .select('*')
        .limit(5)
      
      if (allError) {
        console.error('查詢所有資料錯誤:', allError)
      } else if (allData && allData.length > 0) {
        console.log('找到其他資料:')
        allData.forEach((row, index) => {
          console.log(`資料${index + 1} - ID: ${row.id}`)
        })
      } else {
        console.log('資料表確實是空的')
      }
    }
    
  } catch (err) {
    console.error('偵錯過程發生錯誤:', err)
  }
}

debugData()
