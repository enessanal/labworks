var fileSystem=require("fs");
var fileWriteStream;

var packets=[];
var frameProtocols=[];
var IPs=[];
var ipSrcs=[];
var ipDsts=[];
var tcpPorts=[];
var tcpSrcPorts=[];
var tcpDstPorts=[];
var udpPorts=[];
var udpSrcPorts=[];
var udpDstPorts=[];
var tcpFlags=[];

var packetFilePath="../../packetss.json";

fileSystem.readFile(packetFilePath,"utf8",function(error,data)
{
    var originalPackets=JSON.parse(data);
    for(var i=0;i<originalPackets.length;i++)
    {
        packets.push(preProcessPacket(originalPackets[i]));
    }       
    analyzePackets(packets);

    fileWriteStream = fileSystem.createWriteStream("processed.json");
    packets.forEach(function(packet) 
    { 
        var str='{"index":{"_type":"network_packet"}}';
        fileWriteStream.write(str+'\n'+JSON.stringify(packet)+'\n')
    
    });
    fileWriteStream.end();



    console.log(packets[0].frame_time.getMilliseconds());

    packets.sort(function(a,b){return a.timestamp - b.timestamp});




    for(var i=0;i<5;i++)
    {
        console.log(packets[i].frame_time+"   "+packets[i].timestamp);
    }

    var rows=[];
    var row=[];




  
    var start_time=0;
    var finish_time=0;


    var ss=[];

    for(var i=0;i<packets.length;i++)
    {
        if(packets[i].timestamp<=finish_time)
        {
            row.push(packets[i]);
            ss.push(packets[i].frame_time  +"    "+packets[i].timestamp);
        }
        else
        {
            ss.push("");
            ss.push("=> "+start_time);
            ss.push("=> "+finish_time);
            ss.push("");


            rows.push(row.length);
            row=[];
            start_time=packets[i].timestamp;
            finish_time=start_time+0.001;

            row.push(packets[i]);
            ss.push(packets[i].frame_time  +"    "+packets[i].timestamp);


        }
    }
    // console.log(ss);
    
   fileWriteStream = fileSystem.createWriteStream("grouped.json");
   ss.forEach(function(element) 
    { 
        fileWriteStream.write(JSON.stringify(element)+'\n')
    
    });
    fileWriteStream.end();
});




























function preProcessPacket(originalPacket)
{
    var packet={};  

    try { packet.timestamp=eval(originalPacket["_source"]["layers"]["frame"]["frame.time_epoch"]); } catch (error) {}

    try { packet.frame_protocols=originalPacket["_source"]["layers"]["frame"]["frame.protocols"]; } catch (error) {}
    try { packet.frame_time=new Date(originalPacket["_source"]["layers"]["frame"]["frame.time"]); } catch (error) {}
    try { packet.frame_len=eval(originalPacket["_source"]["layers"]["frame"]["frame.len"]) } catch (error) {}

    try { packet.eth_src=originalPacket["_source"]["layers"]["eth"]["eth.src_tree"]["eth.addr"]; } catch (error) {}
    try { packet.eth_src_resolved=originalPacket["_source"]["layers"]["eth"]["eth.src_tree"]["eth.addr_resolved"]; } catch (error) {}
    try { packet.eth_dst=originalPacket["_source"]["layers"]["eth"]["eth.dst_tree"]["eth.addr"]; } catch (error) {}
    try { packet.eth_dst_resolved=originalPacket["_source"]["layers"]["eth"]["eth.dst_tree"]["eth.addr_resolved"]; } catch (error) {}
    try { packet.eth_type=originalPacket["_source"]["layers"]["eth"]["eth.type"]; } catch (error) {}

    try { packet.ip_version=eval(originalPacket["_source"]["layers"]["ip"]["ip.version"]) } catch (error) {}
    try { packet.ip_hdr_len=eval(originalPacket["_source"]["layers"]["ip"]["ip.hdr_len"]) } catch (error) {}
    try { packet.ip_src=originalPacket["_source"]["layers"]["ip"]["ip.src"]; } catch (error) {}
    try { packet.ip_dst=originalPacket["_source"]["layers"]["ip"]["ip.dst"]; } catch (error) {}
    try { packet.ip_len=eval(originalPacket["_source"]["layers"]["ip"]["ip.len"]) } catch (error) {}
    try { packet.ip_ttl=eval(originalPacket["_source"]["layers"]["ip"]["ip.ttl"]) } catch (error) {}
    try { packet.ip_protocol=originalPacket["_source"]["layers"]["ip"]["ip.proto"]; } catch (error) {}
    try {packet.geoip_src_lat=eval(originalPacket["_source"]["layers"]["ip"][Object.keys(originalPacket["_source"]["layers"]["ip"])[ Object.keys(originalPacket["_source"]["layers"]["ip"]).length-2]]["ip.geoip.lat"])} catch (error) {}
    try {packet.geoip_src_lon=eval(originalPacket["_source"]["layers"]["ip"][Object.keys(originalPacket["_source"]["layers"]["ip"])[ Object.keys(originalPacket["_source"]["layers"]["ip"]).length-2]]["ip.geoip.lon"])} catch (error) {}
    try {packet.geoip_src_country=originalPacket["_source"]["layers"]["ip"][Object.keys(originalPacket["_source"]["layers"]["ip"])[ Object.keys(originalPacket["_source"]["layers"]["ip"]).length-2]]["ip.geoip.country"];} catch (error) {}
    try {packet.geoip_src_city=originalPacket["_source"]["layers"]["ip"][Object.keys(originalPacket["_source"]["layers"]["ip"])[ Object.keys(originalPacket["_source"]["layers"]["ip"]).length-2]]["ip.geoip.city"];} catch (error) {}
    try {packet.geoip_dst_lat=eval(originalPacket["_source"]["layers"]["ip"][Object.keys(originalPacket["_source"]["layers"]["ip"])[ Object.keys(originalPacket["_source"]["layers"]["ip"]).length-1]]["ip.geoip.lat"])} catch (error) {}
    try {packet.geoip_dst_lon=eval(originalPacket["_source"]["layers"]["ip"][Object.keys(originalPacket["_source"]["layers"]["ip"])[ Object.keys(originalPacket["_source"]["layers"]["ip"]).length-1]]["ip.geoip.lon"])} catch (error) {}
    try {packet.geoip_dst_country=originalPacket["_source"]["layers"]["ip"][Object.keys(originalPacket["_source"]["layers"]["ip"])[ Object.keys(originalPacket["_source"]["layers"]["ip"]).length-1]]["ip.geoip.country"];} catch (error) {}
    try {packet.geoip_dst_city=originalPacket["_source"]["layers"]["ip"][Object.keys(originalPacket["_source"]["layers"]["ip"])[ Object.keys(originalPacket["_source"]["layers"]["ip"]).length-1]]["ip.geoip.city"];} catch (error) {}

    try { packet.tcp_dst_port=eval(originalPacket["_source"]["layers"]["tcp"]["tcp.dstport"]) } catch (error) {}
    try { packet.tcp_src_port=eval(originalPacket["_source"]["layers"]["tcp"]["tcp.srcport"]) } catch (error) {}
    try { packet.tcp_hdr_len=eval(originalPacket["_source"]["layers"]["tcp"]["tcp.hdr_len"]) } catch (error) {}
    try { packet.tcp_len=eval(originalPacket["_source"]["layers"]["tcp"]["tcp.len"]) } catch (error) {}
    try { packet.tcp_flags=originalPacket["_source"]["layers"]["tcp"]["tcp.flags"]; } catch (error) {}
    try { packet.tcp_window_size=eval(originalPacket["_source"]["layers"]["tcp"]["tcp.window_size"]) } catch (error) {}

    try { packet.udp_dst_port=originalPacket["_source"]["layers"]["udp"]["udp.dstport"]; } catch (error) {}
    try { packet.udp_src_port=originalPacket["_source"]["layers"]["udp"]["udp.srcport"]; } catch (error) {}
    try { packet.udp_len=originalPacket["_source"]["layers"]["udp"]["udp.length"]; } catch (error) {}

    try {packet.http_request_method=originalPacket["_source"]["layers"]["http"][Object.keys(originalPacket["_source"]["layers"]["http"])[0]]["http.request.method"];} catch (error) {}
    try {packet.http_request_uri=originalPacket["_source"]["layers"]["http"][Object.keys(originalPacket["_source"]["layers"]["http"])[0]]["http.request.uri"];} catch (error) {}
    try {packet.http_user_agent=originalPacket["_source"]["layers"]["http"]["http.user_agent"];} catch (error) {}
    try {packet.http_content_type=originalPacket["_source"]["layers"]["http"]["http.content_type"];} catch (error) {}
    try {packet.http_connection=originalPacket["_source"]["layers"]["http"]["http.connection"];} catch (error) {}
    try {packet.http_request_full_uri=originalPacket["_source"]["layers"]["http"]["http.request.full_uri"];} catch (error) {}
    try {packet.http_content_length_header=originalPacket["_source"]["layers"]["http"]["http.content_length_header"];} catch (error) {}
    try {packet.http_request_version=originalPacket["_source"]["layers"]["http"][Object.keys(originalPacket["_source"]["layers"]["http"])[0]]["http.request.version"];} catch (error) {}
    try {packet.http_request_code=originalPacket["_source"]["layers"]["http"][Object.keys(originalPacket["_source"]["layers"]["http"])[0]]["http.response.code"];} catch (error) {}

    try{ if (packet.tcp_flags == "0x00000001"){ packet.flags_fin=true; } else{ packet.flags_fin=false; } }catch(error){}
    try{ if (packet.tcp_flags == "0x00000002"){ packet.flags_syn=true; } else{ packet.flags_syn=false; } }catch(error){}
    try{ if (packet.tcp_flags == "0x00000004"){ packet.flags_rst=true; } else{ packet.flags_rst=false; } }catch(error){}
    try{ if (packet.tcp_flags == "0x00000008"){ packet.flags_psh=true; } else{ packet.flags_psh=false; } }catch(error){}
    try{ if (packet.tcp_flags == "0x00000010"){ packet.flags_ack=true; } else{ packet.flags_ack=false; } }catch(error){}
    try{ if (packet.tcp_flags == "0x00000020"){ packet.flags_urg=true; } else{ packet.flags_urg=false; } }catch(error){}
    try{ if (packet.tcp_flags == "0x00000040"){ packet.flags_ece=true; } else{ packet.flags_ece=false; } }catch(error){}
    try{ if (packet.tcp_flags == "0x00000080"){ packet.flags_cw=true; } else{ packet.flags_cw=false; } }catch(error){}
    try{ if (packet.tcp_flags == "0x00000003"){ packet.flags_fin_syn=true; } else{ packet.flags_fin_syn=false; } }catch(error){}
    try{ if (packet.tcp_flags == "0x00000009"){ packet.flags_fin_psh=true; } else{ packet.flags_fin_psh=false; } }catch(error){}
    try{ if (packet.tcp_flags == "0x0000000A"){ packet.flags_syn_psh=true; } else{ packet.flags_syn_psh=false; } }catch(error){}
    try{ if (packet.tcp_flags == "0x00000011"){ packet.flags_fin_ack=true; } else{ packet.flags_fin_ack=false; } }catch(error){}
    try{ if (packet.tcp_flags == "0x00000012"){ packet.flags_syn_ack=true; } else{ packet.flags_syn_ack=false; } }catch(error){}
    try{ if (packet.tcp_flags == "0x00000014"){ packet.flags_ack_rst=true; } else{ packet.flags_ack_rst=false; } }catch(error){}
    try{ if (packet.tcp_flags == "0x00000018"){ packet.flags_psh_ack=true; } else{ packet.flags_psh_ack=false; } }catch(error){}
    try{ if (packet.tcp_flags == "0x00000019"){ packet.flags_fin_psh_ack=true; } else{ packet.flags_fin_psh_ack=false; } }catch(error){}

    var tmp = packet.frame_protocols;
    
    if(tmp.split(':').slice(4,5)=="ssl")
    {
        packet.frame_protocols=tmp.split(':').slice(1,5).join(":");
    }    
    else if(tmp.split(':').slice(4,5)=="http")
    {
        packet.frame_protocols=tmp.split(':').slice(1,6).join(":");
    }   
    else if(tmp.split(':').slice(4,5)=="icmp")
    {
        packet.frame_protocols=tmp.split(':').slice(1,9).join(":");
    }    
    else if(tmp.split(':').slice(4,5)=="ldap")
    {
        packet.frame_protocols=tmp.split(':').slice(1,5).join(":");
    } 
    else if(tmp.split(':').slice(3,4)=="udp")
    {
        packet.frame_protocols=tmp.split(':').slice(1,6).join(":");
    } 

    return packet;
}




function analyzePackets(packets)
{
    for(var i=0;i<packets.length;i++)
    {
        hashPush(IPs,packets[i].ip_src);
        hashPush(IPs,packets[i].ip_dst);

        hashPush(ipSrcs,packets[i].ip_src);
        hashPush(ipDsts,packets[i].ip_dst);

        hashPush(frameProtocols,packets[i].frame_protocols);

        hashPush(tcpFlags,packets[i].tcp_flags);
    }
}

function hashPush(array,element)
{
    if(!array.includes(element)) array.push(element);
}


function log(str)
{
    console.log(str);
}












/*
function readFileAndGetKeys()
{
    fileSystem.readFile(packetFilePath, "UTF8", fileReadss);
}


 
function fileReadss(error, data)
{
    var packets=JSON.parse(data);
    var keys=[];



    for(var i=0;i<packets.length;i++)
    {
        var packet=packets[i];
        getAllKeys(packet,keys);
    }

    var fileWriteStream = fileSystem.createWriteStream('keys_nal.txt');
    fileWriteStream.on('error', function(err) {});
    keys.forEach(function(v) { fileWriteStream.write(v+'\n')});
    fileWriteStream.end();
}
 
function getAllKeys(obj, keys)
{
    for( var i=0; i<Object.keys(obj).length; i++)
    {  
        var currentKey=Object.keys(obj)[i];

        if((obj[currentKey]==null)?obj[currentKey]="null":obj[currentKey])
        {
            //console.log(currentKey+" => "+Object.keys(obj[currentKey]));
            var keys2=Object.keys(obj[currentKey]);

            if(!keys.includes(currentKey)) keys.push(currentKey);

            if(keys2[0]!=0) 
            {
                getAllKeys(obj[currentKey],keys);
            }
        }       
    }
}*/

