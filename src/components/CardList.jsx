// CardsList.jsx
import Button from './Button'
import React, { useState } from 'react'
import Card from './Card'
import Search from './Search'


const CardList = ({ data }) => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(data)
  //console.log({ data })

  //New code for setting Offset
  const handleOffset = (value) => {
    setOffset((prevOffset) => prevOffset + value);
  }

  // const handlePrevious = () => {
  //   setOffset(offset - 10);
  // }

  // const handleNext = () => {
  //   setOffset(offset + 10);
  // }

  const getPaginatedProducts = () => {
    return products.slice(offset, offset + limit);
  }

  const filterTags = (tag) => {
    const filtered = data.filter(product => {
      if (!tag) {
        return product
      }

      const terms = tag.toLowerCase().split(' ')
      //return product.tags.find(({ title }) => title == tag)

      //Used includes for bonus points
      return terms.every(term => {
        return product.tags.some(tag => tag.title.toLowerCase().includes(term));
      });
    })
    setOffset(0)
    setProducts(filtered)
  }

  //Code for disabling Next button if products are nill
  const productsNill = offset + limit >= products.length;

  const disableNext = () => {
    return <button className="f5 no-underline black bg-animate inline-flex items-center pa3 ba border-box mr4" disabled>
      <span className="pl1">Next</span>
    </button>
  }

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      <div className="mt2 mb2">
        {getPaginatedProducts().map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => handleOffset(-10)} />
        {productsNill ? (
          disableNext()
        ) : (
          <Button text="Next" handleClick={() => handleOffset(10)} />
        )}
      </div>
    </div>
  )
}

export default CardList;