import { supabase } from './supabase'

export const carContentService = {
  // 查詢ID=1的car_content記錄
  async getCarContent() {
    try {
      const { data, error } = await supabase
        .from('car_content')
        .select('*')
        .eq('id', 1)
        .single()
      
      if (error) {
        console.error('查詢car_content失敗:', error)
        throw error
      }
      
      return data
    } catch (error) {
      console.error('獲取車輛內容失敗:', error)
      throw error
    }
  },

  // 更新car_content記錄
  async updateCarContent(updates) {
    try {
      const { data, error } = await supabase
        .from('car_content')
        .update(updates)
        .eq('id', 1)
        .select()
        .single()
      
      if (error) {
        console.error('更新car_content失敗:', error)
        throw error
      }
      
      return data
    } catch (error) {
      console.error('更新車輛內容失敗:', error)
      throw error
    }
  }
}
