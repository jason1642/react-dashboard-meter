import { FunctionComponent, useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import type { maxValues, GaugeMeterProps } from '../types'
import Container from './Container'
import ProgressBarFiller from './ProgressBarFiller';
import ProgressBarCover from './ProgressBarCover';
import { calculatePercentFilled } from './calculatePercentFilled';
import { defaultLabelOptions } from './Labels';
import Title, { defaultTitleOptions } from './Title';





const GaugeMeter: FunctionComponent<GaugeMeterProps> = (
  {
    value = 25,
    titleOptions,
    labelOptions,
    progressBarFillerColor = 'linear-gradient(to right, #f7351f 0%, #f3ff18 50%, #12f912 100%)',
    progressBarContainerColor = 'grey',
    innerAreaBackgroundColor = 'white',
    range = [0, 40],
    guageInnerAreaSize = 79,

  }) => {
  const [maxValues, setMaxValues] = useState<maxValues>()

  const handleMaxValues: (maxValues: maxValues) => void = (maxValues: maxValues) => {
    setMaxValues(maxValues)
  }


  const percentFilled: number | undefined = useMemo(() => calculatePercentFilled(value, range), [range, value])


  useEffect(() => {
    // console.log(maxValues)
    // console.log(percentFilled)
  }, [maxValues, percentFilled]);


  return percentFilled !== undefined ? (
    <Container handleMaxValues={handleMaxValues}  >
      {maxValues && percentFilled !== undefined && <>

        <ProgressBarFiller
          guageInnerAreaSize={guageInnerAreaSize}
          maxValues={{ maxHeight: maxValues.maxWidth / 2, maxWidth: maxValues.maxWidth }}
          innerAreaBackgroundColor={innerAreaBackgroundColor}
          progressBarFillerColor={progressBarFillerColor}
          range={range}
          labelOptions={{ ...defaultLabelOptions, ...labelOptions }}
        />

        {/* Cover is the component that rotates */}
        <ProgressBarCover
          progressBarContainerColor={progressBarContainerColor}
          percentFilled={percentFilled}
          maxValues={{ maxHeight: maxValues.maxWidth / 2, maxWidth: maxValues.maxWidth }}
        />



        <Title
          range={range}
          titleOptions={{ ...defaultTitleOptions, ...titleOptions }}
          value={value}

        />

      </>
      }
    </Container>


  ) : <></>
};

export default GaugeMeter;
