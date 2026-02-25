import { CommonModule } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { Product } from '../../models/product.model';

export type SharePlatform = 'whatsapp' | 'telegram';

export interface ShareEvent {
  product: Product;
  platform: SharePlatform;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
  readonly share = output<ShareEvent>();

  readonly selectedImageIndex = signal(0);
  readonly starIndexes = [1, 2, 3, 4, 5] as const;

  readonly roundedRating = computed(() => Math.round(this.product().rating));
  readonly installmentAmount = computed(() => Math.round(this.product().price / 3));
  readonly pseudoReviewCount = computed(() => Math.round(this.product().rating * 1000 + this.product().id * 197));
  readonly galleryImages = computed(() => {
    const primaryImage = this.product().image.trim();
    const extraImages = this.product().images.filter((img) => img.trim().length > 0);

    if (primaryImage.length === 0) {
      return extraImages;
    }

    if (extraImages.includes(primaryImage)) {
      return extraImages;
    }

    return [primaryImage, ...extraImages];
  });

  readonly currentImage = computed(() => {
    const images = this.galleryImages();
    const currentIndex = this.selectedImageIndex();
    return images[currentIndex] ?? this.product().image;
  });

  setImage(index: number): void {
    this.selectedImageIndex.set(index);
  }

  previousImage(): void {
    const imageCount = this.galleryImages().length;
    if (imageCount === 0) {
      return;
    }

    this.selectedImageIndex.update((value) => (value - 1 + imageCount) % imageCount);
  }

  nextImage(): void {
    const imageCount = this.galleryImages().length;
    if (imageCount === 0) {
      return;
    }

    this.selectedImageIndex.update((value) => (value + 1) % imageCount);
  }

  shareOn(platform: SharePlatform): void {
    this.share.emit({
      product: this.product(),
      platform
    });
  }
}
