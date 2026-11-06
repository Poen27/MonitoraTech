(() => {
  'use strict';
  const config = window.SITE_CONFIG || {};
  const email = typeof config.email === 'string' ? config.email.trim() : '';
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


  // PERSONALIZAÇÃO: os textos e cores são definidos no config.js.
  // Edite apenas aquele arquivo para alterar a aparência da página.
  const setPlainText = (selector, value) => {
    if (typeof value !== 'string' || !value.trim()) return;
    const el = document.querySelector(selector);
    if (!el || el.textContent.trim() === value.trim()) return;
    el.textContent = value;
  };
  const setHeading = (id, normal, highlighted) => {
    const el = document.getElementById(id);
    if (!el) return;
    const em = el.querySelector('em');
    if (typeof normal === 'string' && normal.trim()) {
      const firstText = Array.from(el.childNodes).find(n => n.nodeType === 3);
      if (firstText) firstText.textContent = normal.trim() + ' ';
      else el.insertBefore(document.createTextNode(normal.trim() + ' '), el.firstChild);
    }
    if (em && typeof highlighted === 'string' && highlighted.trim()) {
      em.textContent = highlighted.trim();
    }
  };
  const isHex = (color) => typeof color === 'string' && /^#[0-9a-fA-F]{6}$/.test(color);
  if (isHex(config.corPrincipal)) document.documentElement.style.setProperty('--green', config.corPrincipal);
  if (isHex(config.corFundo)) document.documentElement.style.setProperty('--navy', config.corFundo);
  if (typeof config.nomeProjeto === 'string' && config.nomeProjeto.trim()) {
    document.querySelectorAll('.brand > span').forEach(el => {
      const firstText = Array.from(el.childNodes).find(n => n.nodeType === 3);
      if (firstText) firstText.textContent = config.nomeProjeto.trim();
      else el.insertBefore(document.createTextNode(config.nomeProjeto.trim()), el.firstChild);
    });
    document.title = config.nomeProjeto.trim() + ' — Monitoramento de TI';
  }
  if (typeof config.subtituloMarca === 'string' && config.subtituloMarca.trim()) {
    document.querySelectorAll('.brand small').forEach(el => { el.textContent = config.subtituloMarca.trim(); });
  }
  setHeading('hero-title', config.tituloPrincipal, config.destaquePrincipal);
  setPlainText('.hero-description', config.descricaoPrincipal);
  setHeading('contact-title', config.tituloContato, config.destaqueContato);
  setPlainText('.contact-copy > p', config.descricaoContato);

  const year = document.getElementById('current-year');
  if (year) year.textContent = String(new Date().getFullYear());

  const mobileMenu = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const menuIcon = mobileMenu?.querySelector('use');
  const setMenu = (open) => {
    if (!mobileNav || !mobileMenu) return;
    mobileNav.hidden = !open;
    mobileMenu.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    if (menuIcon) menuIcon.setAttribute('href', open ? '#i-close' : '#i-menu');
  };
  mobileMenu?.addEventListener('click', () => setMenu(mobileNav.hidden));
  mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  window.addEventListener('resize', () => { if (window.innerWidth > 850) setMenu(false); });

  const contactLink = document.getElementById('contact-email-link');
  if (contactLink && emailValid) {
    contactLink.textContent = email;
    contactLink.href = 'mailto:' + email;
  } else if (contactLink) {
    contactLink.textContent = 'Adicione seu e-mail no config.js';
    contactLink.setAttribute('aria-label', 'E-mail do projeto ainda não configurado');
    contactLink.removeAttribute('href');
  }

  const metricData = {
    cpu: {title: 'Utilização de CPU', value: '38%', values: [39,45,37,48,43,56,50,61,46,53,65,58,67,57,70,65,56,60]},
    memory: {title: 'Utilização de memória', value: '62%', values: [51,53,55,53,57,56,60,59,63,61,64,66,63,62,65,62,64,62]},
    network: {title: 'Atividade da rede', value: '24%', values: [15,22,18,44,35,28,57,39,50,27,33,56,38,48,59,41,34,24]}
  };
  const line = document.getElementById('chart-line');
  const area = document.getElementById('chart-area');
  function drawMetric(key) {
    const metric = metricData[key];
    if (!metric || !line || !area) return;
    const points = metric.values.map((v, i) => `${(i * 520 / (metric.values.length - 1)).toFixed(1)} ${(158 - v * 1.48).toFixed(1)}`);
    const path = 'M' + points.join(' L');
    line.setAttribute('d', path);
    area.setAttribute('d', path + ' L520 158 L0 158 Z');
    document.getElementById('chart-title').textContent = metric.title;
    document.getElementById('chart-value').textContent = metric.value;
    document.querySelectorAll('.chart-tab').forEach(tab => {
      const active = tab.dataset.metric === key;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-pressed', String(active));
    });
  }
  document.querySelectorAll('.chart-tab').forEach(tab => tab.addEventListener('click', () => drawMetric(tab.dataset.metric)));
  drawMetric('cpu');

  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const setStatus = (message, kind = '') => { if (status) { status.textContent = message; status.className = 'form-status ' + kind; } };
  function buildMessage() {
    if (!form.reportValidity()) return null;
    const name = document.getElementById('contact-name').value.trim();
    const from = document.getElementById('contact-mail').value.trim();
    const company = document.getElementById('contact-company').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    if (!name || !from || !message) {
      setStatus('Preencha seu nome, e-mail e mensagem.', 'error');
      return null;
    }
    return { subject: `Contato pelo site — ${name}`, body: `Olá!\n\nNome: ${name}\nE-mail para resposta: ${from}\nEmpresa/instituição: ${company || 'Não informado'}\n\nMensagem:\n${message}\n\nEnviado a partir do site do projeto de monitoramento.` };
  }
  form?.addEventListener('submit', event => {
    event.preventDefault();
    const message = buildMessage();
    if (!message) return;
    if (!emailValid) {
      setStatus('O e-mail de destino ainda não foi configurado. Use "Copiar mensagem" ou defina o endereço no arquivo config.js antes de publicar.', 'error');
      return;
    }
    const uri = 'mailto:' + email + '?subject=' + encodeURIComponent(message.subject) + '&body=' + encodeURIComponent(message.body);
    setStatus('Abrindo seu aplicativo de e-mail. Confira a mensagem e confirme o envio por lá.', 'success');
    window.location.href = uri;
  });
  document.getElementById('copy-message')?.addEventListener('click', async () => {
    const message = buildMessage();
    if (!message) return;
    const text = message.subject + '\n\n' + message.body;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const el = document.createElement('textarea');
        el.value = text;
        el.style.cssText = 'position:fixed;left:-9999px;top:0;';
        document.body.appendChild(el);
        el.select();
        if (!document.execCommand('copy')) throw new Error('Não foi possível copiar');
        el.remove();
      }
      setStatus('Mensagem copiada! Cole no seu aplicativo de e-mail ou mensagem para enviar.', 'success');
    } catch (_) { setStatus('Não foi possível copiar automaticamente. Selecione o texto e copie manualmente.', 'error'); }
  });
})();