// filter.config.ts
export const EMAIL_FILTERS: { [email: string]: string[] } = {
    'test@gmail.com': ['test'],
    'li@gmail.com': ['Launch Italy', 'Launch Italien', 'LAUNCH Italy', 'LAUNCH ITALY', 'Launch italy','launch italy', 'launch Italy'],
    'dts@mail.com': ['dts', 'DTS'],
    'team-was@was-info.com': ['was', 'WAS'],
    // Weitere E-Mail-Adressen und Filter hier hinzufügen
  };
  