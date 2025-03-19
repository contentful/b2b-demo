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
              `items-stretch md:w-1/2 lg:w-1/${Number(cols)} xl:w-1/${
                Number(cols) + 1
              }`
            } p-2 w-full`}
          >
            <ProductCard {...{ ...passedProps, variant, product }} />
          </div>
        );
      })}
    </>
  );
}
