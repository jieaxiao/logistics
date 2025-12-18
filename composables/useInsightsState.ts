// export const useInsightsState = () => {
//   const category = useState<'company' | 'industry' | 'knowledge'>(
//     'insights-category',
//     () => 'knowledge'
//   )

//   const setCategory = (val: typeof category.value) => {
//     category.value = val
//   }

//   return {
//     category,
//     setCategory
//   }
// }
// composables/useInsightsState.ts
export const useInsightsState = () => {
  const route = useRoute()

  const category = computed(() => {
    return (route.params.category || 'knowledge') as
      | 'company'
      | 'industry'
      | 'knowledge'
  })

  return { category }
}
