import { ResponsiveTimeRange } from '@nivo/calendar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const data = [
    {
      "value": 169,
      "day": "2018-06-29"
    },
    {
      "value": 260,
      "day": "2018-04-14"
    },
    {
      "value": 165,
      "day": "2018-05-02"
    },
    {
      "value": 44,
      "day": "2018-08-11"
    },
    {
      "value": 229,
      "day": "2018-06-16"
    },
    {
      "value": 9,
      "day": "2018-04-08"
    },
    {
      "value": 76,
      "day": "2018-06-14"
    },
    {
      "value": 298,
      "day": "2018-05-08"
    },
    {
      "value": 221,
      "day": "2018-06-03"
    },
    {
      "value": 254,
      "day": "2018-07-08"
    },
    {
      "value": 88,
      "day": "2018-05-15"
    },
    {
      "value": 164,
      "day": "2018-08-09"
    },
    {
      "value": 123,
      "day": "2018-04-01"
    },
    {
      "value": 341,
      "day": "2018-07-05"
    },
    {
      "value": 239,
      "day": "2018-07-22"
    },
    {
      "value": 375,
      "day": "2018-07-04"
    },
    {
      "value": 335,
      "day": "2018-05-06"
    },
    {
      "value": 230,
      "day": "2018-07-03"
    },
    {
      "value": 160,
      "day": "2018-08-04"
    },
    {
      "value": 122,
      "day": "2018-06-15"
    },
    {
      "value": 361,
      "day": "2018-04-20"
    },
    {
      "value": 12,
      "day": "2018-08-03"
    },
    {
      "value": 293,
      "day": "2018-04-11"
    },
    {
      "value": 146,
      "day": "2018-07-06"
    },
    {
      "value": 66,
      "day": "2018-06-25"
    },
    {
      "value": 229,
      "day": "2018-04-25"
    },
    {
      "value": 288,
      "day": "2018-08-10"
    },
    {
      "value": 52,
      "day": "2018-06-20"
    },
    {
      "value": 61,
      "day": "2018-05-20"
    },
    {
      "value": 389,
      "day": "2018-07-19"
    },
    {
      "value": 384,
      "day": "2018-08-05"
    },
    {
      "value": 198,
      "day": "2018-06-24"
    },
    {
      "value": 114,
      "day": "2018-05-28"
    },
    {
      "value": 186,
      "day": "2018-08-06"
    },
    {
      "value": 18,
      "day": "2018-07-10"
    },
    {
      "value": 274,
      "day": "2018-04-24"
    },
    {
      "value": 249,
      "day": "2018-06-10"
    },
    {
      "value": 372,
      "day": "2018-06-28"
    },
    {
      "value": 159,
      "day": "2018-05-22"
    },
    {
      "value": 107,
      "day": "2018-05-26"
    },
    {
      "value": 55,
      "day": "2018-07-11"
    },
    {
      "value": 320,
      "day": "2018-04-02"
    },
    {
      "value": 51,
      "day": "2018-04-07"
    },
    {
      "value": 169,
      "day": "2018-06-26"
    },
    {
      "value": 239,
      "day": "2018-04-15"
    },
    {
      "value": 218,
      "day": "2018-07-13"
    },
    {
      "value": 247,
      "day": "2018-05-12"
    },
    {
      "value": 304,
      "day": "2018-08-02"
    },
    {
      "value": 243,
      "day": "2018-06-27"
    },
    {
      "value": 208,
      "day": "2018-06-04"
    },
    {
      "value": 16,
      "day": "2018-05-13"
    },
    {
      "value": 377,
      "day": "2018-04-06"
    },
    {
      "value": 166,
      "day": "2018-05-31"
    },
    {
      "value": 298,
      "day": "2018-04-23"
    },
    {
      "value": 301,
      "day": "2018-05-27"
    },
    {
      "value": 142,
      "day": "2018-07-24"
    },
    {
      "value": 105,
      "day": "2018-07-12"
    },
    {
      "value": 361,
      "day": "2018-08-01"
    },
    {
      "value": 343,
      "day": "2018-05-19"
    },
    {
      "value": 13,
      "day": "2018-06-12"
    },
    {
      "value": 34,
      "day": "2018-04-05"
    },
    {
      "value": 317,
      "day": "2018-04-10"
    },
    {
      "value": 137,
      "day": "2018-07-20"
    },
    {
      "value": 29,
      "day": "2018-07-30"
    },
    {
      "value": 344,
      "day": "2018-07-02"
    }
  ]

export default function Test() {
    return (
        <div className='h-screen w-screen'>

<ResponsiveTimeRange
        data={data}
        from="2018-04-01"
        to="2018-08-12"
        emptyColor="#eeeeee"
        colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
        margin={{ top: 40, right: 40, bottom: 100, left: 40 }}
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'row',
                justify: false,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left',
                translateX: -60,
                translateY: -60,
                symbolSize: 20
            }
        ]}
    />
        </div>
        
    )
}