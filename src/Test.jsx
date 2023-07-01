import ReactCalendarHeatmap from "react-calendar-heatmap"
import './calendarstyles.css'

export default function Test() {
    return (
        <ReactCalendarHeatmap
            horizontal={false}
            showWeekdayLabels
            startDate={new Date('2016-01-01')}
            endDate={new Date('2016-02-01')}
            values={[
                { date: '2016-01-01', count: 12 },
                { date: '2016-01-02', count: 12 },
                { date: '2016-01-22', count: 122 },
                { date: '2016-01-30', count: 38 },
            ]}
/>
    )
}