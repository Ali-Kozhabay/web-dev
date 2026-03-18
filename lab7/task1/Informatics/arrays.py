#A
N = int(input())
arr = list(map(int, input().split()))

for i in range(0, N, 2):
    print(arr[i], end=' ')

#B
N = int(input())
arr = list(map(int, input().split()))

for x in arr:
    if x % 2 == 0:
        print(x, end=' ')

#C
N = int(input())
arr = list(map(int, input().split()))

count = sum(1 for x in arr if x > 0)
print(count)

#D
N = int(input())
arr = list(map(int, input().split()))

count = sum(1 for i in range(1, N) if arr[i] > arr[i-1])
print(count)

#E
N = int(input())
arr = list(map(int, input().split()))

for i in range(1, N):
    if arr[i] * arr[i-1] > 0:  # оба положительные или оба отрицательные
        print("YES")
        break
else:
    print("NO")

#F
N = int(input())
arr = list(map(int, input().split()))

count = 0
for i in range(1, N-1):
    if arr[i] > arr[i-1] and arr[i] > arr[i+1]:
        count += 1

print(count)

#G
N = int(input())
arr = list(map(int, input().split()))


for i in range(N // 2):
    arr[i], arr[N - 1 - i] = arr[N - 1 - i], arr[i]

print(*arr)
