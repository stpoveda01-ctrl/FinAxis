async function analizarIA() {
  // Leer datos manuales
  const activos = parseFloat(document.getElementById("activos").value);
  const pasivos = parseFloat(document.getElementById("pasivos").value);
  const patrimonio = parseFloat(document.getElementById("patrimonio").value);
  const ingresos = parseFloat(document.getElementById("ingresos").value);
  const costos = parseFloat(document.getElementById("costos").value);
  const gastos = parseFloat(document.getElementById("gastos").value);

  // Validar que haya datos
  if (isNaN(activos) || isNaN(pasivos) || isNaN(patrimonio) || isNaN(ingresos) || isNaN(costos) || isNaN(gastos)) {
    alert("Por favor ingrese todos los valores correctamente");
    return;
  }

  // Calcular ratios simples
  const liquidez = activos / pasivos;
  const endeudamiento = pasivos / patrimonio;
  const utilidadNeta = ingresos - costos - gastos;
  const margen = utilidadNeta / ingresos;

  // Prompt para IA
  const promptIA = `Actúa como CFO experto y analiza estos datos:
Liquidez: ${liquidez.toFixed(2)}
Endeudamiento: ${endeudamiento.toFixed(2)}
ROA (aprox): ${(utilidadNeta/activos).toFixed(2)}
Margen: ${margen.toFixed(2)}
Genera diagnóstico, riesgos y recomendaciones para la empresa.`;

  try {
    // Llamada al proxy seguro que contiene la API Key de Gemini
    const response = await fetch('https://finaxis-gemini-proxy.vercel.app/api/gemini', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({prompt: promptIA})
    });

    const data = await response.json();
    document.getElementById("resultadoIA").innerText = data.texto || "No se pudo generar el análisis";
  } catch (e) {
    document.getElementById("resultadoIA").innerText = "Error: " + e.message;
  }
}
