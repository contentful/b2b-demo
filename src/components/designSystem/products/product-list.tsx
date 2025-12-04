'use client';

import { Product } from '@/models/commerce-types';
import ProductCard from './product-card';

export default function ProductList(props: any) {
  const { cols, products, variant, ...passedProps } = props;

  return (
    <>
      {products?.map((product: Product, key: number) => {
        return (
          <div
            key={key}
            className={`flex ${
              variant === 'card' &&
              `items-stretch ${
                Number(cols) === 3
                  ? 'md:w-1/3'
                  : Number(cols) === 4
                  ? 'md:w-1/4'
                  : 'md:w-1/5'
              } sm:w-1/2`
            } p-2 w-full`}
          >
            <ProductCard {...{ ...passedProps, variant, product }} />
          </div>
        );
      })}
    </>
  );
}
