import { FunctionComponent, useMemo, useState, useEffect } from 'react';
import type { maxValues, GaugeMeterProps, gaugeInnerAreaSize } from '../types'
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
    innerAreaBackgroundColor = 'white',
    range = [0, 100],
    gaugeInnerAreaSize,
    containerStyles
  }) => {
    const defaultGaugeInnerAreaSize: gaugeInnerAreaSize = gaugeInnerAreaSize ? gaugeInnerAreaSize :  labelOptions?.labelPosition === 'inside' ? 79 :  86
  const [maxValues, setMaxValues] = useState<maxValues>()
  const handleMaxValues: (maxValues: maxValues) => void = (maxValues: maxValues) => {
    setMaxValues(maxValues)
  }
 
  const percentFilled = useMemo<number | undefined>(()=>calculatePercentFilled(value, range), [range, value])


  const [progressFillerWidth, setProgressFillerWidth] = useState<number>()

  useEffect(() => {
    maxValues && setProgressFillerWidth((maxValues.maxWidth - (maxValues.maxWidth * (defaultGaugeInnerAreaSize / 100))) / 2)
  }, [maxValues]);

  return (typeof percentFilled === 'number') && (typeof value === 'number') ? (
    <Container containerStyles={containerStyles} handleMaxValues={handleMaxValues}  >
      { maxValues && progressFillerWidth &&  <>

        <ProgressBarFiller
          gaugeInnerAreaSize={defaultGaugeInnerAreaSize}
          maxValues={{ maxHeight: maxValues.maxWidth / 2, maxWidth: maxValues.maxWidth }}
          labelOptions={{ ...defaultLabelOptions, ...labelOptions }}
          {...{
            range,
            percentFilled,
            progressFillerWidth,
            progressBarOptions,
            innerAreaBackgroundColor
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
