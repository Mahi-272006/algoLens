export const EXAMPLES = [
  {
    title: 'Bubble Sort',
    lang: 'python',
    tag: 'Sorting',
    complexity: 'O(n²)',
    code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`
  },
  {
    title: 'Binary Search',
    lang: 'python',
    tag: 'Searching',
    complexity: 'O(log n)',
    code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`
  },
  {
    title: 'Merge Sort',
    lang: 'python',
    tag: 'Sorting',
    complexity: 'O(n log n)',
    code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`
  },
  {
    title: "Dijkstra's Algorithm",
    lang: 'python',
    tag: 'Graphs',
    complexity: 'O(V log V)',
    code: `import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    while pq:
        curr_dist, curr_node = heapq.heappop(pq)
        if curr_dist > distances[curr_node]:
            continue
        for neighbor, weight in graph[curr_node].items():
            distance = curr_dist + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
    return distances`
  },
  {
    title: 'DFS Traversal',
    lang: 'python',
    tag: 'Graphs',
    complexity: 'O(V+E)',
    code: `def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    print(start, end=' ')
    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
    return visited`
  },
  {
    title: 'Fibonacci (DP)',
    lang: 'python',
    tag: 'Dynamic Programming',
    complexity: 'O(n)',
    code: `def fibonacci_dp(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]`
  },
  {
    title: 'Quick Sort',
    lang: 'python',
    tag: 'Sorting',
    complexity: 'O(n log n)',
    code: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)`
  },
  {
    title: 'BFS Shortest Path',
    lang: 'python',
    tag: 'Graphs',
    complexity: 'O(V+E)',
    code: `from collections import deque

def bfs(graph, start, end):
    queue = deque([[start]])
    visited = {start}
    while queue:
        path = queue.popleft()
        node = path[-1]
        if node == end:
            return path
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(path + [neighbor])
    return None`
  }
]

export const TAG_COLORS = {
  Sorting: '#7c6af7',
  Searching: '#34d399',
  Graphs: '#fbbf24',
  Tree: '#f472b6',
  'Dynamic Programming': '#f87171',
  Recursion: '#a78bfa',
  Other: '#9990cc'
}
