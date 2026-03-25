from django.http import JsonResponse
from .models import Product, Category


def products_list(request):
    products = Product.objects.all()  # ORM (SELECT *)
    return JsonResponse(list(products.values()), safe=False)


def product_detail(request, id):
    try:
        product = Product.objects.get(id=id)  # SELECT WHERE id
        return JsonResponse({
            "id": product.id,
            "name": product.name,
            "price": product.price,
            "description": product.description,
            "count": product.count,
            "is_active": product.is_active,
            "category_id": product.category_id
        })
    except Product.DoesNotExist:
        return JsonResponse({"error": "Not found"}, status=404)


def categories_list(request):
    categories = Category.objects.all()
    return JsonResponse(list(categories.values()), safe=False)


def category_detail(request, id):
    try:
        category = Category.objects.get(id=id)
        return JsonResponse({
            "id": category.id,
            "name": category.name
        })
    except Category.DoesNotExist:
        return JsonResponse({"error": "Not found"}, status=404)


def category_products(request, id):
    products = Product.objects.filter(category_id=id)  # FILTER (lecture)
    return JsonResponse(list(products.values()), safe=False)