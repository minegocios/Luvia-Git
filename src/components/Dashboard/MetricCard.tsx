import React from 'react';
import { Card, Text, Metric } from '@tremor/react';
import type { Metric as MetricType } from '../../types';

interface MetricCardProps {
  metric: MetricType;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  return (
    <Card className="max-w-xs mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <Text>{metric.title}</Text>
          <Metric>{metric.value}</Metric>
        </div>
        <div className="p-2 bg-blue-50 rounded-full dark:bg-blue-900/20">
          {metric.icon}
        </div>
      </div>
      {metric.change !== undefined && (
        <Text className={metric.change >= 0 ? 'text-green-500' : 'text-red-500'}>
          {metric.change >= 0 ? '+' : ''}{metric.change}% desde ontem
        </Text>
      )}
    </Card>
  );
};

export default MetricCard;