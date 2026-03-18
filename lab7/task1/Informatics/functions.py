#A
def min4(a, b, c, d):
    return min(a, b, c, d)


a, b, c, d = map(int, input().split())
print(min4(a, b, c, d))

#B
def power(a, n):
    result = 1
    for _ in range(n):
        result *= a
    return result

a, n = input().split()
a = float(a)
n = int(n)
print(power(a, n))

#C
def xor(x, y):
    return int(bool(x) != bool(y))


x, y = map(int, input().split())
print(xor(x, y))
