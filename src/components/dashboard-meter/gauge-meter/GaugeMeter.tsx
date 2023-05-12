import { FunctionComponent, useMemo, useState, useEffect } from 'react';
import type { maxValues, GaugeMeterProps, innerAreaSize } from '../types'
import Container from './Container'
import ProgressBarFiller from './ProgressBarFiller';
import { calculatePercentFilled } from './calculatePercentFilled';
import { defaultLabelOptions } from './Labels';
import Title, { defaultTitleOptions } from './Title';

const GaugeMeter: FunctionComponent<GaugeMeterProps> = (
  {
    value,
    progressBarOptions,
    titleOptions,
    labelOptions,
    innerAreaColor = 'white',
    range = [0, 100],
    innerAreaSize,
    containerStyles
  }) => {
    const defaultinnerAreaSize: innerAreaSize = innerAreaSize ? innerAreaSize :  labelOptions?.labelPosition === 'inside' ? 79 :  86
  const [maxValues, setMaxValues] = useState<maxValues>()
  const handleMaxValues: (maxValues: maxValues) => void = (maxValues: maxValues) => {
    setMaxValues(maxValues)
  } 
 
  const percentFilled = useMemo<number | undefined>(()=>calculatePercentFilled(value, range), [range, value])


  const [progressFillerWidth, setProgressFillerWidth] = useState<number>()

  useEffect(() => {
    maxValues && setProgressFillerWidth((maxValues.maxWidth - (maxValues.maxWidth * (defaultinnerAreaSize / 100))) / 2)
  }, [maxValues]);

  return (typeof percentFilled === 'number') && (typeof value === 'number') ? (
    <Container containerStyles={containerStyles} handleMaxValues={handleMaxValues}  >
      { maxValues && progressFillerWidth &&  <>

        <ProgressBarFiller
          innerAreaSize={defaultinnerAreaSize}
          maxValues={{ maxHeight: maxValues.maxWidth / 2, maxWidth: maxValues.maxWidth }}
          labelOptions={{ ...defaultLabelOptions, ...labelOptions }}
          {...{
            range,
            percentFilled,
            progressFillerWidth,
            progressBarOptions,
            innerAreaColor
          }}
        />

        <Title
          containerWidth={maxValues.maxWidth}
          progressFillerWidth={progressFillerWidth}
          range={range}
          value={value}
          titleOptions={{ ...defaultTitleOptions, ...(titleOptions || {}) }}
        />

      </>
      }
    </Container>


  ) : <></>
};

export default GaugeMeter;
