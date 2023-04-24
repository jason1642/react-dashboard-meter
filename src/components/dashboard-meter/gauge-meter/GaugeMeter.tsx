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
    value,
    titleOptions,
    labelOptions,
    progressBarFillerColor = 'linear-gradient(to right, #74f685 0%, #18ff46 50%, #00ff00 100%)',
    // progressBarFillerColor = 'linear-gradient(to right, #f7351f 0%, #f3ff18 50%, #12f912 100%)',
    progressBarContainerColor = 'lightgrey',
    innerAreaBackgroundColor = 'white',
    range = [0, 100],
    guageInnerAreaSize = 86,

  }) => {
  const [maxValues, setMaxValues] = useState<maxValues>()
  const handleMaxValues: (maxValues: maxValues) => void = (maxValues: maxValues) => {
    setMaxValues(maxValues)
  }

  const percentFilled: number | undefined = useMemo(() => calculatePercentFilled(value, range), [range, value])
  const [progressFillerWidth, setProgressFillerWidth] = useState<number>()

  useEffect(() => {
    // console.log(maxValues)
    // console.log(percentFilled)
    maxValues && setProgressFillerWidth((maxValues.maxWidth - (maxValues.maxWidth * (guageInnerAreaSize / 100))) / 2)
  }, [maxValues, percentFilled]);

  return percentFilled !== undefined && value ? (
    <Container handleMaxValues={handleMaxValues}  >
      {maxValues && percentFilled !== undefined && progressFillerWidth &&  <>

        <ProgressBarFiller
          guageInnerAreaSize={guageInnerAreaSize}
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
