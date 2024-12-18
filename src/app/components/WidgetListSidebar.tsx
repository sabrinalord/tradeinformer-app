
import { WidgetData} from '../types';
import Widget from './Widget';

interface WidgetListSidebarProps {
    data: WidgetData[];
}

export default function WidgetListSidebar({data}: WidgetListSidebarProps) {

    return (
     
    <div>
      {data.map((banner, index) => (
        <Widget key={index} data={banner} type='sidebar' ></Widget>
      ))}
    </div>
     
    );
}