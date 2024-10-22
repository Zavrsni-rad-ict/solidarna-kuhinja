import { FeatureFlags } from '@/types';
import { useFeatureFlagEnabled } from 'posthog-js/react';

export const useFeatureFlags = (featureFlag: FeatureFlags) =>
  useFeatureFlagEnabled(featureFlag);
