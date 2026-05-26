import React, { useState, ChangeEvent } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { formatPhoneNumber } from 'utils/formatPhoneNumber';

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceOfInterest, setServiceOfInterest] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'success' | 'error' | 'submitting' | ''>('');

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          serviceOfInterest,
          message,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setPhone('');
        setServiceOfInterest('');
        setMessage('');
      } else {
        setStatus('error');
        console.error(data.message || 'Erro ao enviar formulário');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div
      className="
        relative
        isolate
        bg-white
        rounded-3xl
        shadow-2xl
        p-8
        md:p-12
        max-w-2xl
        mx-auto
      "
      style={{
        backgroundColor: '#ffffff',
        opacity: 1,
        colorScheme: 'light', // 🔒 força modo claro
      }}
    >
      {/* TÍTULO */}
      <div className="text-center mb-10">
        <h2 className="text-[#0c1a25] text-3xl md:text-4xl font-extrabold leading-tight">
          Entre em contato conosco
        </h2>

        <p className="text-base md:text-lg text-gray-700 mt-4 leading-relaxed">
          Compartilhe suas necessidades com o escritório de advocacia <strong>Pereira de Sousa</strong>.
          Nossa atuação é pautada na escuta atenta, clareza e segurança jurídica,
          oferecendo soluções personalizadas para cada situação.
        </p>
      </div>

      {/* FORMULÁRIO */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nome */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome completo"
            required
            className="input-base"
          />

          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu melhor e-mail"
            required
            className="input-base"
          />

          {/* Telefone */}
          <input
            type="text"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Telefone / WhatsApp (opcional)"
            className="input-base md:col-span-2"
          />
        </div>

        {/* Área */}
        <select
          value={serviceOfInterest}
          onChange={(e) => setServiceOfInterest(e.target.value)}
          className="input-base"
        >
          <option value="">Selecione a área de atuação (opcional)</option>
          <option value="DireitoEmpresarial">Direito Empresarial</option>
          <option value="DireitoTrabalho">Direito do Trabalho</option>
          <option value="DireitoCivil">Direito Civil</option>
          <option value="DireitoFamiliaSucessoes">Família e Sucessões</option>
          <option value="DireitoPenal">Direito Penal</option>
          <option value="DireitoAgrario">Direito Agrário</option>
          <option value="DireitoPrevidenciario">Direito Previdenciário</option>
          <option value="DireitoConsumidor">Direito do Consumidor</option>
          <option value="DireitoBancario">Direito Bancário</option>
          <option value="DireitoDigital">Direito Digital</option>
          <option value="DireitoSaude">Direito da Saúde</option>
          <option value="DireitoTEA">Direitos da Pessoa com TEA</option>
          <option value="Outro">Outro assunto</option>
        </select>

        {/* Mensagem */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Descreva sua necessidade em detalhes..."
          rows={6}
          required
          className="input-base resize-none"
        />

        {/* Botão */}
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="
            mt-2
            w-full
            flex
            items-center
            justify-center
            gap-2
            px-6
            py-3
            bg-black
            text-white
            font-bold
            rounded-full
            shadow-lg
            transition-all
            duration-200
            hover:-translate-y-1
            hover:shadow-xl
            disabled:bg-white
            disabled:cursor-not-allowed
          "
        >
          {status === 'submitting' ? 'Enviando...' : 'Enviar mensagem'}
          <FaPaperPlane />
        </button>

        {/* Feedback */}
        {status === 'success' && (
          <p className="text-green-600 text-center font-medium">
            Mensagem enviada com sucesso. Em breve entraremos em contato.
          </p>
        )}

        {status === 'error' && (
          <p className="text-red-600 text-center font-medium">
            Ocorreu um erro ao enviar sua mensagem. Tente novamente.
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
