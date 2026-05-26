export const SERVICE_LABELS: Record<string, string> = {
  DireitoEmpresarial: "Direito Empresarial",
  DireitoTrabalho: "Direito do Trabalho",
  DireitoCivil: "Direito Civil",
  DireitoFamiliaSucessoes: "Família e Sucessões",
  DireitoPenal: "Direito Penal",
  DireitoAgrario: "Direito Agrário",
  DireitoPrevidenciario: "Direito Previdenciário",
  DireitoConsumidor: "Direito do Consumidor",
  DireitoBancario: "Direito Bancário",
  DireitoDigital: "Direito Digital",
  DireitoSaude: "Direito da Saúde",
  DireitoTEA: "Direitos da Pessoa com TEA",
  Outro: "Outro assunto",
};

export function formatServiceOfInterest(value: string | null | undefined): string {
  if (!value) return "—";
  return SERVICE_LABELS[value] ?? value;
}
