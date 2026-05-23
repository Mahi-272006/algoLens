export function generateBubbleSortStates(arr) {
  const states = [{ arr: [...arr], comparing: [], sorted: [] }]
  const n = arr.length
  const sortedFrom = []
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      states.push({ arr: [...arr], comparing: [j, j + 1], sorted: [...sortedFrom] })
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        states.push({ arr: [...arr], comparing: [j, j + 1], sorted: [...sortedFrom] })
      }
    }
    sortedFrom.push(n - 1 - i)
  }
  states.push({ arr: [...arr], comparing: [], sorted: arr.map((_, i) => i) })
  return states
}

export function parseVizData(vizType, vizData) {
  if (vizType === 'array_sort') {
    return vizData
      .split(',')
      .map(n => parseInt(n.trim()))
      .filter(n => !isNaN(n))
      .slice(0, 12)
  }
  if (vizType === 'binary_search') {
    const parts = vizData.split(' ')
    const nums = (parts[0] || '').replace('sorted:', '').split(',').map(n => parseInt(n)).filter(n => !isNaN(n))
    const target = parseInt((parts[1] || 'target:5').replace('target:', ''))
    return { nums, target }
  }
  return null
}
