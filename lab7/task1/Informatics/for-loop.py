#A
a = int(input())
b = int(input())

for x in range(a, b + 1):
    if x % 2 == 0:
        print(x, end=' ')

#B
a = int(input())
b = int(input())
c = int(input())
d = int(input())

for x in range(a, b + 1):
    if x % d == c:
        print(x, end=' ')

#C
import math

a = int(input())
b = int(input())

start = math.ceil(a ** 0.5)

x = start
while x * x <= b:
    print(x * x, end=' ')
    x += 1

#D
x = int(input())
d = int(input())

count = 0
while x > 0:
    if x % 10 == d:
        count += 1
    x //= 10

print(count)

#G
x = int(input())

for i in range(2, x + 1):
    if x % i == 0:
        print(i)
        break

#H
x = int(input())

divisors = []
for i in range(1, x + 1):
    if x % i == 0:
        divisors.append(i)

print(*divisors)

#I
import math

x = int(input())
count = 0

for i in range(1, int(math.isqrt(x)) + 1):
    if x % i == 0:
        if i * i == x:
            count += 1
        else:
            count += 2 

print(count)

#J
total = 0

for _ in range(100):
    n = int(input())
    total += n

print(total)

#K
N = int(input())
total = 0

for _ in range(N):
    n = int(input())
    total += n

print(total)

#M
N = int(input())
count = 0

for _ in range(N):
    n = int(input())
    if n == 0:
        count += 1

print(count)