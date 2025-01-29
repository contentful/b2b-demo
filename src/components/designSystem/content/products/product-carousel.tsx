import { ProductCard } from '@/components/designSystem';
import { Product } from '@/models/commerce-types';
import { Typography } from '@material-tailwind/react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function ProductCarousel(props: any) {
  const preview = props.isInExpEditorMode;
  const { products, ...passedProps } = props;

  const responsive = {
    xxl: {
      breakpoint: { max: 3400, min: 1141 },
      items: Number(props.xxlcols) || 6,
    },
    xl: {
      breakpoint: { max: 1140, min: 961 },
      items: Number(props.xlcols) || 5,
    },
    lg: {
      breakpoint: { max: 960, min: 721 },
      items: Number(props.lgcols) || 4,
    },
    md: {
      breakpoint: { max: 720, min: 541 },
      items: 2,
    },
    sm: {
      breakpoint: { max: 540, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      {preview && (
        <Typography className='h-1 overflow-hidden text-sm w-full'>
          &nbsp;
        </Typography>
      )}
      <Carousel
        className='h-full w-full'
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        infinite={true}
        slidesToSlide={1}
        renderDotsOutside
      >
        {products.map((product: Product, key: number) => {
          return (
            <div className='h-80 mx-2' key={key}>
              <ProductCard
                border={true}
                product={product}
                variant='card'
                addtocart={false}
                reviews={true}
              />
            </div>
          );
        })}
      </Carousel>
    </>
  );
}
