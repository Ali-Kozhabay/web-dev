def merge_the_tools(string, k):
    n = len(string)
    for i in range(0, n, k):
        substring = string[i:i+k]
        seen = set()
        result = ''
        for char in substring:
            if char not in seen:
                result += char
                seen.add(char)
        print(result)


if __name__ == '__main__':
    string, k = input(), int(input())
    merge_the_tools(string, k)