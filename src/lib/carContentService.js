import { supabase } from './supabase'

export const carContentService = {
  // 查詢ID=1的car_content記錄
  async getCarContent() {
    try {
      const { data, error } = await supabase
        .from('car_content')
        .select('*')
        .eq('id', 1)
      
      if (error) {
        console.error('查詢car_content失敗:', error)
        throw error
      }
      
      // 返回第一筆記錄，如果沒有記錄則返回null
      return data && data.length > 0 ? data[0] : null
    } catch (error) {
      console.error('獲取車輛內容失敗:', error)
      throw error
    }
  },

  // 更新或創建car_content記錄
  async updateCarContent(updates) {
    try {
      // 先檢查是否存在ID=1的記錄
      const { data: existingData } = await supabase
        .from('car_content')
        .select('id')
        .eq('id', 1)
      
      if (existingData && existingData.length > 0) {
        // 如果存在，則更新
        const { data, error } = await supabase
          .from('car_content')
          .update(updates)
          .eq('id', 1)
          .select()
        
        if (error) {
          console.error('更新car_content失敗:', error)
          throw error
        }
        
        return data && data.length > 0 ? data[0] : data
      } else {
        // 如果不存在，則創建新記錄
        const newRecord = { id: 1, ...updates }
        const { data, error } = await supabase
          .from('car_content')
          .insert([newRecord])
          .select()
        
        if (error) {
          console.error('創建car_content失敗:', error)
          throw error
        }
        
        return data && data.length > 0 ? data[0] : data
      }
    } catch (error) {
      console.error('更新車輛內容失敗:', error)
      throw error
    }
  }
}
