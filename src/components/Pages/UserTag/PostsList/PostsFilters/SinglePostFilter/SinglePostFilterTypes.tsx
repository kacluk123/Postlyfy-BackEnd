export interface ISinglePostFilter {
  icon: React.ReactNode;
  filterText: string;
  onFilterClick: () => void;
  isFilterActive: boolean;
};