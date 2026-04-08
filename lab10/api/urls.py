from django.urls import path, include
from .views import ProductListAPIView, ProductDetailAPIView

urlpatterns = [
    path('products/', ProductListAPIView.as_view()),
    path('products/<int:product_id>/', ProductDetailAPIView.as_view()),
]