// filter.config.ts
export const EMAIL_FILTERS: { [email: string]: string[] } = {
    'test@gmail.com': ['test'],
    'li@gmail.com': ['Launch Italy', 'Launch Italien', 'LAUNCH Italy', 'LAUNCH ITALY', 'Launch italy','launch italy', 'launch Italy'],
    'dts@mail.com': ['dts', 'DTS'],
    'team-was@was-info.com': ['was', 'WAS'],
    'coler@coler.de': ['coler', 'EKB', 'Coler'],
    'vehidiag@gmail.com': ['Vehi', 'Vehi Diag', 'vehi diag'],
    'ddc@test.com': ['ddc', 'DDC'],
    'a.lobach@launch-europe.de': ['CZ','SK','HU','IHR', 'ihr','Ihr','Univer','UNIVER', 'LKQ','Inter Cars','IC','INTER CARS', 'MTA','Mta','MtaPlus','mtaplus', 'WM CZ','SAG','SAG CZ','Slavicek', 'Auto Slavicek','AD Partner','J+M','j+m', 'IAG','IAG CZ','Wrobel','RSP', 'RSP Trading','Spitec','SpiTec','IC SK','Peterson Technik', 'Jantolak','Innovation center','Innovation Center','WM SK','Baranek','Autotechna Baranek', 'Homola', 'homola','Homola SK'],
    'info@autodiagnostika.sk': ['Jantolak', 'jantolak', 'Jantolak SK'],
  // Weitere E-Mail-Adressen und Filter hier hinzufügen
  };

