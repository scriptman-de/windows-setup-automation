export interface IComputer {
  name: string;
  serial: string;
  manufacturer?: string;
  model?: string;
  mac?: string;
  comment?: string;
}

export interface IComputersTable {
  computers: IComputer[];
  deleteComputer: ({ name, serial: string }) => void;
  deleteMultiple: (computerSerial: string[]) => void;
}

export interface IComputersTableCheckbox {
  label: string;
  isSelected: boolean;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
