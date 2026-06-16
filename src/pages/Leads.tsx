import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

const GET_LEADS_URL = 'https://functions.poehali.dev/1eb4a834-48bc-4564-9bcf-f554cb4c653e';

interface Lead {
  id: number;
  name: string | null;
  phone: string;
  task: string | null;
  created_at: string;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString('ru-RU', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(GET_LEADS_URL)
      .then(r => r.json())
      .then(d => setLeads(d.leads || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <header className="border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <a href="/" className="font-display text-xl uppercase font-black">
            Чисто<span className="text-primary">.Вывоз</span>
          </a>
          <span className="text-sm text-muted-foreground">Заявки с сайта</span>
        </div>
      </header>

      <main className="container py-12">
        <div className="flex items-center gap-4 mb-8">
          <h1 className="font-display text-3xl uppercase font-black">Заявки</h1>
          {!loading && (
            <span className="bg-primary text-white text-sm font-display px-3 py-1 rounded-none">
              {leads.length}
            </span>
          )}
        </div>

        {loading ? (
          <div className="flex items-center gap-3 text-muted-foreground py-20">
            <Icon name="Loader" size={20} className="animate-spin" />
            Загружаем заявки...
          </div>
        ) : leads.length === 0 ? (
          <div className="border border-border p-16 text-center">
            <Icon name="Inbox" size={40} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Заявок пока нет</p>
          </div>
        ) : (
          <div className="border border-border divide-y divide-border">
            {leads.map((lead, i) => (
              <div key={lead.id} className="p-6 flex flex-col sm:flex-row sm:items-start gap-4 hover:bg-secondary transition-colors">
                <div className="font-display text-3xl font-black text-muted-foreground/20 w-10 shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 grid sm:grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Имя</div>
                    <div className="font-display text-base uppercase">{lead.name || '—'}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Телефон</div>
                    <a
                      href={`tel:${lead.phone.replace(/[^+\d]/g, '')}`}
                      className="font-display text-base uppercase text-primary hover:underline"
                    >
                      {lead.phone}
                    </a>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Задача</div>
                    <div className="text-sm">{lead.task || '—'}</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground shrink-0 sm:text-right">
                  {formatDate(lead.created_at)}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Leads;
