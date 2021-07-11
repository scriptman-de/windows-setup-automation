import {Computer} from "@prisma/client";

export interface IComputersTable {
  computers: Computer[];
  deleteComputer: ({ name, serial: string }) => void;
  deleteMultiple: (computerSerial: string[]) => void;
}

export interface IComputersTableCheckbox {
  label: string;
  isSelected: boolean;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type HttpResponseComputerEnabled = {
  success: boolean;
  computers: Computer[];
}

export type HttpResponseComputerCreate = {
  success: boolean;
  computer: Computer;
}
export type HttpResponseComputerCreateError = {
  success: boolean;
  message: string;
}

export type HttpResponseComputerDeleteMany = {
  success: boolean;
  deleted: string[];
  errors: string[];
}
export type HttpResponseComputerDeleteManyError = {
  success: boolean;
  message: string;
  errors?: string[];
}

export type HttpResponseComputerImport = {
  success: boolean;
}

export type HttpResponseComputerImportError = {
  success: boolean;
  computers: Computer[];
}
