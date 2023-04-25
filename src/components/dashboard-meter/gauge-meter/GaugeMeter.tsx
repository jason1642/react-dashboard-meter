import { FunctionComponent, useMemo, useState, useEffect } from 'react';
import type { maxValues, GaugeMeterProps, gaugeInnerAreaSize } from '../types'
import Container from './Container'
import ProgressBarFiller from './ProgressBarFiller';
import ProgressBarCover from './ProgressBarCover';
import { calculatePercentFilled } from './calculatePercentFilled';
import { defaultLabelOptions } from './Labels';
import Title, { defaultTitleOptions } from './Title';

const GaugeMeter: FunctionComponent<GaugeMeterProps> = (
  {
    value,
    titleOptions,
    labelOptions,
    progressBarFillerColor = 's',
    // progressBarFillerColor = 'green',
    progressBarContainerColor = 'grey',
    innerAreaBackgroundColor = 'white',
    range = [0, 40],
    gaugeInnerAreaSize,

  }) => {
    const defaultGaugeInnerAreaSize: gaugeInnerAreaSize = gaugeInnerAreaSize ? gaugeInnerAreaSize :  labelOptions?.labelPosition === 'inside' ? 79 :  86
  const [maxValues, setMaxValues] = useState<maxValues>()
  const handleMaxValues: (maxValues: maxValues) => void = (maxValues: maxValues) => {
    setMaxValues(maxValues)
  }
 
  const percentFilled: number | undefined = useMemo(() => calculatePercentFilled(value, range), [range, value])
  const [progressFillerWidth, setProgressFillerWidth] = useState<number>()

  useEffect(() => {
    // console.log(maxValues)
    // console.log(percentFilled)
    maxValues && setProgressFillerWidth((maxValues.maxWidth - (maxValues.maxWidth * (defaultGaugeInnerAreaSize / 100))) / 2)
  }, [maxValues, percentFilled]);

  return percentFilled && typeof value === 'number' ? (
    <Container handleMaxValues={handleMaxValues}  >
      {maxValues && progressFillerWidth &&  <>

        <ProgressBarFiller
          gaugeInnerAreaSize={defaultGaugeInnerAreaSize}
          maxValues={{ maxHeight: maxValues.maxWidth / 2, maxWidth: maxValues.maxWidth }}
          innerAreaBackgroundColor={innerAreaBackgroundColor}
          progressBarFillerColor={progressBarFillerColor}
          range={range}
          progressFillerWidth={progressFillerWidth}
          labelOptions={{ ...defaultLabelOptions, ...labelOptions }}
        />

        {/* Cover is the component that rotates */}
        <ProgressBarCover
          progressBarContainerColor={progressBarContainerColor}
          percentFilled={percentFilled}
          maxValues={{ maxHeight: maxValues.maxWidth / 2, maxWidth: maxValues.maxWidth }}
        />



        <Title
          containerWidth={maxValues.maxWidth}
          progressFillerWidth={progressFillerWidth}
          range={range}
          titleOptions={{ ...defaultTitleOptions, ...(titleOptions || []) }}
          value={value}

        />

      </>
      }
    </Container>


  ) : <></>
};

export default GaugeMeter;
