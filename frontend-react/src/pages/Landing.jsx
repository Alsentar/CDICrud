import "../components/LandingPageStyle.css";

import miguelPicture from "../assets/MiguelMidiendo.jpeg";
import logoOne from "../assets/phonesymbol.jpeg";
import logoTwo from "../assets/Mailsymbol.jpeg";
import igSymbol from "../assets/IGsymbol.jpeg";
import wsSymbol from "../assets/WSSymbol.jpeg";
import fbSymbol from "../assets/FBSymbol.jpeg";




export default function Landing() {
  return (

    <>

    <div id="boxshadow"></div>

    <div id="landingbody">

        

        <div id="landingbodyone">
            
            <h1>Tecnologia de <i id="precisionwording">precision</i> para tus proyectos</h1>
            <h5>En la casa del ingeniero te ofrecemos los servicios de venta y reparacion especializada de equipos topograficos.</h5>
            <a href="productospage.html">
                <button id="verproductosbutton">Ver productos</button>
            </a>
            
            <a href="#contactsection">
                <button id="contactanosbutton">Contactanos</button>
            </a>

        </div>

        <div id="landingbodytwo">
            
            <img id="miguelpicture" src={miguelPicture}/>
            
        </div>
        
  
    </div>


    <div id="contactsection">

        
        <p>Estamos aqui para ayudarte con tus proyectos topograficos. Contactanos para orientarte en tu jornada.</p>

        <div id="tagsforcontact">
            
            <div id="contacttag">
                
                <img id="contactlogoone" src={logoOne} />

                <div id="contacttext">
                    
                    <h4 id="contactheader">TELEFONO</h4>
                    <h5 id="contactbottom">+1 (809)-687-8016</h5>
                </div>

            </div>

            <div id="contacttag">
                
                <img id="contactlogotwo" src={logoTwo} />

                
                <div id="contacttext">
                    
                    <h4 id="contactheader">MAIL</h4>
                    <h5 id="contactbottom">Admin@casadelingeniero.com</h5>
                </div>

            </div>

        </div>

        <h3>Siguenos en nuestras redes sociales</h3>
        <h4>Mantente al dia con nuestros proyectos y novedades.</h4>

        <div id="socialmedialogos">
            <img src={igSymbol}/>
            <img src={wsSymbol}/>
            <img src={fbSymbol}/>
        </div>

    </div>

    
    </>

    


  );
}
