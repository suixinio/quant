package trader

//math tool store for otto

import (
	"github.com/d4l3k/talib"
	//	"math"
)

var (
	Mathtools Mathtool
)

type Mathtool struct {
}

func (m Mathtool) Sin(real []float64) []float64 {
	return talib.Sin(real)
}

func (m Mathtool) Ema(real []float64, timePeriod int) []float64 {
	return talib.Ema(real, timePeriod)
}
