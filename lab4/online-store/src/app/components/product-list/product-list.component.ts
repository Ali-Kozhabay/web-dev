import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../models/product.model';
import { ProductCardComponent, ShareEvent } from '../product-card/product-card.component';

type SortMode = 'popular' | 'priceAsc' | 'priceDesc' | 'ratingDesc';

interface SidebarCategory {
  name: string;
  count: number;
}

interface PriceRange {
  id: string;
  label: string;
  min: number;
  max: number | null;
  count: number;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  readonly products: Product[] = PRODUCTS;
  readonly selectedPriceRangeId = signal('all');
  readonly searchValue = signal('');
  readonly sortMode = signal<SortMode>('popular');

  readonly sidebarCategories: SidebarCategory[] = [
    { name: 'Аксессуары для телефонов', count: 1412456 },
    { name: 'Смартфоны', count: 8801 },
    { name: 'Смарт-часы', count: 2771 },
    { name: 'Гаджеты', count: 2192 },
    { name: 'Аксессуары для смарт-часов', count: 14027 },
    { name: 'Мобильные телефоны', count: 98 },
    { name: 'Проводные телефоны', count: 125 },
    { name: 'Радиотелефоны', count: 124 }
  ];

  readonly priceRanges: PriceRange[] = [
    { id: 'p1', label: 'до 10 000 ₸', min: 0, max: 10000, count: 1412835 },
    { id: 'p2', label: '10 000 - 49 999 ₸', min: 10000, max: 49999, count: 16158 },
    { id: 'p3', label: '50 000 - 99 999 ₸', min: 50000, max: 99999, count: 2852 },
    { id: 'p4', label: '100 000 - 149 999 ₸', min: 100000, max: 149999, count: 2541 },
    { id: 'p5', label: '150 000 - 199 999 ₸', min: 150000, max: 199999, count: 1798 },
    { id: 'p6', label: '200 000 - 499 999 ₸', min: 200000, max: 499999, count: 3222 },
    { id: 'p7', label: 'более 500 000 ₸', min: 500000, max: null, count: 974 }
  ];

  readonly visibleProducts = computed(() => {
    const query = this.searchValue().trim().toLowerCase();
    const selectedRange = this.getSelectedPriceRange();
    const mode = this.sortMode();

    let result = this.products.filter((product) => {
      if (query.length > 0) {
        const haystack = `${product.name} ${product.description}`.toLowerCase();
        if (!haystack.includes(query)) {
          return false;
        }
      }

      if (selectedRange) {
        if (product.price < selectedRange.min) {
          return false;
        }

        if (selectedRange.max !== null && product.price > selectedRange.max) {
          return false;
        }
      }

      return true;
    });

    result = [...result];

    if (mode === 'priceAsc') {
      result.sort((a, b) => a.price - b.price);
    } else if (mode === 'priceDesc') {
      result.sort((a, b) => b.price - a.price);
    } else if (mode === 'ratingDesc') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  });

  onSearch(value: string): void {
    this.searchValue.set(value);
  }

  setSortMode(mode: string): void {
    if (mode === 'priceAsc' || mode === 'priceDesc' || mode === 'ratingDesc' || mode === 'popular') {
      this.sortMode.set(mode);
    }
  }

  selectPriceRange(id: string): void {
    this.selectedPriceRangeId.set(id);
  }

  clearFilters(): void {
    this.searchValue.set('');
    this.selectedPriceRangeId.set('all');
    this.sortMode.set('popular');
  }

  onShare(event: ShareEvent): void {
    const shareUrl = this.buildShareUrl(event);
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  }

  private getSelectedPriceRange(): PriceRange | undefined {
    const selectedId = this.selectedPriceRangeId();
    if (selectedId === 'all') {
      return undefined;
    }

    return this.priceRanges.find((range) => range.id === selectedId);
  }

  private buildShareUrl(event: ShareEvent): string {
    const kaspiProductUrl = this.getKaspiProductUrl(event.product.link);

    if (event.platform === 'whatsapp') {
      const message = encodeURIComponent(`Check out this product: ${event.product.name} ${kaspiProductUrl}`);
      return `https://wa.me/?text=${message}`;
    }

    const url = encodeURIComponent(kaspiProductUrl);
    const text = encodeURIComponent(`Check out this product: ${event.product.name}`);
    return `https://t.me/share/url?url=${url}&text=${text}`;
  }

  private getKaspiProductUrl(rawLink: string): string {
    const trimmed = rawLink.trim();
    const withProtocol =
      trimmed.startsWith('https://') || trimmed.startsWith('http://') ? trimmed : `https://${trimmed}`;

    try {
      const parsed = new URL(withProtocol);

      if (!parsed.hostname.endsWith('kaspi.kz')) {
        return 'https://kaspi.kz/';
      }

      return parsed.toString();
    } catch {
      return 'https://kaspi.kz/';
    }
  }
}
